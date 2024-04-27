const userSchema = require('../models/user')
const auditSchema = require('../models/audit')
const patientSchema = require('../models/patient')
const VRSchema = require('../models/verificationRequests')
const tools = require('../tools')

exports.addPatient = async (req,res,next) => {
    try{
        const {user, patient_user_id, age, blood_group,disease,medication, ec_name, ec_contact} = req.body
        const id = user.id
        const user_type = user.user_type
        const getUser = await userSchema.findById(patient_user_id)
        if(!getUser){
            return res.status(400).json({
                success: false,
                message: 'User does not exist'
            })
        }
        const keyData =  await tools.getKeyRestStored('user',getUser._id)
        const key = keyData.key_used
        const iv = keyData.iv_used
        const patientUser = await patientSchema.create({
            name: {data: getUser.name.data, tag: getUser.name.tag},
            user_id: patient_user_id,
            age: tools.encryptInAES(key,iv,age),
            blood_group: tools.encryptInAES(key,iv,blood_group),
            disease: tools.encryptInAES(key,iv,disease),
            medication: tools.encryptInAES(key,iv,medication),
            emergency_contact: {
                name: tools.encryptInAES(key,iv,ec_name),
                contact_details: tools.encryptInAES(key,iv,ec_contact)
            }
        })
        const verifiedPatient = await userSchema.findByIdAndUpdate(getUser._id,{
            admin_verified: tools.encryptInAES(
                process.env.SERVER_SECRET_KEY, 
                process.env.SERVER_SECRET_IV,
                'true'
                )
        })
        const requestRecord = await VRSchema.findOneAndUpdate({user_id: getUser._id},{
            request_status: 'completed'
        })
        // const storeKeys = await tools.storeKeyRest('patient',keyData.key,keyData.iv,patientUser._id)
        console.log(id)
        const auditLog = await auditSchema.create({
            patient_id: [patientUser._id],
            user_id: id,
            action_type: 'create'
        })
        console.log(auditLog)
        return res.status(200).json({
            success: true,
            patient: 'Added!'
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            error: err.message,
        })
    }
}

exports.deletePatient = async (req,res,next) => {
    try{
        const {user,id} = req.body
        const deletedPatient = await patientSchema.findByIdAndDelete({_id: id})
        if(!deletedPatient){
            return res.status(400).json({
                success: false,
                message: 'Patient does not exist'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Patient deleted!'
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            error: err.message,
        })
    }
}

exports.updatePatient = async (req,res,next) => {
    try{
        const {user,patient_id,patient_user_id,name,age, blood_group,ec_name, ec_contact} = req.body
        console.log(req.body)
        const user_id = user.id
        const keyStored = await tools.getKeyRestStored('user',patient_user_id)
        let updatedPatient = {emergency_contact: {}}, recordsUpdated = []
        if(name != undefined){
            recordsUpdated.push('name')
            updatedPatient.name = tools.encryptInAES(keyStored.key_used,keyStored.iv_used,name)
        }
        if(age != undefined){
            recordsUpdated.push('age')
            updatedPatient.age = tools.encryptInAES(keyStored.key_used,keyStored.iv_used,age)
        }
        if(blood_group != undefined){
            recordsUpdated.push('blood_group')
            updatedPatient.blood_group = tools.encryptInAES(keyStored.key_used,keyStored.iv_used,blood_group)
        }
        if(ec_name != undefined){
            recordsUpdated.push('ec_name')
            updatedPatient.emergency_contact.name = tools.encryptInAES(keyStored.key_used,keyStored.iv_used,ec_name)
        }
        if(ec_contact != undefined){
            recordsUpdated.push('ec_contact')
            updatedPatient.emergency_contact.contact_details = tools.encryptInAES(keyStored.key_used,keyStored.iv_used,ec_contact)
        }
        console.log(updatedPatient)
        const getPatient = await patientSchema.findByIdAndUpdate({_id: patient_id},updatedPatient)
        if(!getPatient){
            console.log('Patient does not exist')
            return res.status(400).json({
                success: false, 
                message: 'Patient does not exist'
            })
        }
        console.log('Patient Found')
        const auditLog = await auditSchema.create({
            patient_id: [patient_id],
            user_id: user_id,
            action_type: 'change'
        })
        console.log('Adding to audit')
        return res.status(200).json({
            success: true, 
            message: 'Record updated',
            columns_affected: recordsUpdated
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            error: err.message,
        })
    }
}

exports.getPatient = async (req,res,next) => {
    try{
        const {user} = req.body
        const id = user.id
        const user_type = user.user_type
        console.log(id,user_type)
        if(user_type === "patient"){
            const patientDoc = await patientSchema.findOne({user_id: id})
            if(patientDoc){
                const keyData = await tools.getKeyRestStored('user',patientDoc.user_id)
                const key = keyData.key_used
                const iv = keyData.iv_used
                const auditLog = await auditSchema.create({
                    patient_id: patientDoc._id,
                    user_id: id,
                    action_type: 'query'
                })
                return res.status(200).json({
                    success: true,
                    _id: patientDoc._id,
                    patient_id: id,
                    name: tools.decryptInAES(key,iv,patientDoc.name.data,patientDoc.name.tag),
                    age: tools.decryptInAES(key,iv,patientDoc.age.data,patientDoc.age.tag),
                    blood_group: tools.decryptInAES(key,iv,patientDoc.blood_group.data,patientDoc.blood_group.tag),
                    emergency_contact: {
                        name: tools.decryptInAES(key,iv,patientDoc.emergency_contact.name.data, patientDoc.emergency_contact.name.tag),
                        contact_details: tools.decryptInAES(key,iv,patientDoc.emergency_contact.contact_details.data,patientDoc.emergency_contact.contact_details.tag)
                    }
                })
            }
        }else{
            const allPatients = await patientSchema.find()
            let decryptedPatients = [], patient_ids = [], len = allPatients.length
            for(let i=0;i<len;i++){
                patient_ids.push(allPatients[i]._id)
                const keyStored = await tools.getKeyRestStored('user',allPatients[i].user_id)
                decryptedPatients.push({
                    name: tools.decryptInAES(keyStored.key_used,keyStored.iv_used,allPatients[i].name.data,allPatients[i].name.tag),
                    patient_id: allPatients[i]._id,
                    user_id: allPatients[i].user_id,
                    age: tools.decryptInAES(keyStored.key_used,keyStored.iv_used,allPatients[i].age.data,allPatients[i].age.tag),
                    blood_group: tools.decryptInAES(keyStored.key_used,keyStored.iv_used,allPatients[i].blood_group.data,allPatients[i].blood_group.tag),
                    disease: tools.decryptInAES(keyStored.key_used,keyStored.iv_used,allPatients[i].disease.data,allPatients[i].disease.tag),
                    medication: tools.decryptInAES(keyStored.key_used,keyStored.iv_used,allPatients[i].medication.data,allPatients[i].medication.tag),
                    emergency_contact: {
                        name: tools.decryptInAES(keyStored.key_used,keyStored.iv_used,allPatients[i].emergency_contact.name.data, allPatients[i].emergency_contact.name.tag),
                        contact_details: tools.decryptInAES(keyStored.key_used,keyStored.iv_used,allPatients[i].emergency_contact.contact_details.data,allPatients[i].emergency_contact.contact_details.tag)
                    }
                })
            }
            const auditLog = await auditSchema.create({
                patient_id: patient_ids,
                user_id: id,
                action_type: 'query'
            })
            
            return res.status(200).json({
                success: true,
                num: decryptedPatients.length,
                patients: decryptedPatients
            })
           
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            error: err.message,
        })
    }
}