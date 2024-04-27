const crypto = require('crypto');
const userSchema = require('../models/user')
const keyRest = require('../models/keyRest')
const VRSchema = require('../models/verificationRequests')
const tools = require('../tools')

exports.login = async (req,res,next) => {
    try{
        console.log(req.url)
        const {name, email, password} = req.body
        const unique_id = crypto.createHash('sha256').update(name+email).digest('hex');
        const userExists = await userSchema.findOne({unique_id: unique_id})
        if(!userExists){
            return res.status(200).json({
                success: true,
                message: 'Please register yourself'
            })
        }
        const getKeyRest = await keyRest.findOne({document_id: userExists._id, table_name: 'user'})
        const key = getKeyRest.key_used
        const iv = getKeyRest.iv_used
        const passStored = decryptInAES(key, iv, userExists.password.data, userExists.password.tag)
        if(passStored == password){
            return res.status(200).json({
                success: true,
                token: userExists.getSignedUserToken(),
                dev: userExists,
            })
        }else{
            return res.status(200).json({
                success: false,
                user: "Unauthorized"
            })
        }
    }catch(err){
        return res.status(404).json({
            success: false,
            error: err.message
        })
    }
}

exports.register = async (req,res,next) => {
    try{
        // console.log(process.env.SERVER_SECRET_KEY)
        const {name,email,password,user_type} = req.body
        const unique_id = crypto.createHash('sha256').update(name+email).digest('hex');
        const userExists = await userSchema.findOne({unique_id: unique_id})
        if(userExists){
            return res.status(200).json({
                success: true,
                message: 'User already exists!'
            })
        }
        const iv = crypto.randomBytes(12).toString('hex');
        const key = crypto.randomBytes(32).toString('hex');
        const addUser = await userSchema.create({
            name: encryptInAES(key, iv, name),
            email: encryptInAES(key, iv, email),
            password: encryptInAES(key, iv, password),
            user_type: user_type,
            unique_id: unique_id,
            admin_verified: {data: 'false',tag: 'false'}
        })
        const addKeyRest = await keyRest.create({
            table_name: 'user',
            key_used: key,
            iv_used: iv,
            document_id: addUser._id
        })
        const addRequest = await VRSchema.create({
            name: name,
            email: email,
            user_type: addUser.user_type,
            user_id: addUser._id,
            request_status: 'pending'
        })
        return res.status(200).json({
            success: true,
            token: addUser.getSignedUserToken(),
            dev: addUser,
        })
    }catch(err){
        return res.status(404).json({
            success: false,
            error: err.message,
            more: err
        })
    }
}

exports.validate = async (req,res,next) => {
    try{
        const {user_id} = req.body
        const getUser = await userSchema.findById(user_id)
        if(getUser && getUser.admin_verified !== 'false'){
            const adminVerification = decryptInAES(
                process.env.SERVER_SECRET_KEY,
                process.env.SERVER_SECRET_IV,
                getUser.admin_verified.data,
                getUser.admin_verified.tag
                )
            if(adminVerification === 'true'){
                return res.status(200).json({
                    success: true,
                    role: getUser.user_type
                })
            }else{
                return res.status(200).json({
                    success: false,
                    message: 'Unverified User'
                })
            }
        }
        return res.status(200).json({
            success: false,
            message: 'User does not exist'
        })
    }catch(err){
        return res.status(200).json({
            success: false,
            error: err.message
        })
    }
}

//Sourced from https://medium.com/@tony.infisical/guide-to-nodes-crypto-module-for-encryption-decryption-65c077176980
function encryptInAES(key, iv, message){
    const cipher = crypto.createCipheriv(
        "aes-256-gcm", 
        Buffer.from(key, 'hex'), 
        Buffer.from(iv, 'hex')
      );
      let data = cipher.update(message, 'utf8', 'hex');
      data += cipher.final('hex');
      const tag = cipher.getAuthTag().toString('hex')
      return { data, tag }
}

function decryptInAES(key, iv, cipher, tag){
    const decipher = crypto.createDecipheriv(
        "aes-256-gcm", 
        Buffer.from(key, 'hex'),
        Buffer.from(iv, 'hex')
      );
      
      decipher.setAuthTag(Buffer.from(tag, 'hex'));
    
      let plaintext = decipher.update(cipher, 'hex', 'utf8');
      plaintext += decipher.final('utf8');
    
      return plaintext;
}

exports.verify = async (req, res, next) => {
    try{
        const {user_id} = req.body
        const getUser = await userSchema.findByIdAndUpdate({_id: user_id},{
            admin_verified: encryptInAES(
                process.env.SERVER_SECRET_KEY, 
                process.env.SERVER_SECRET_IV,
                'true'
                )
        })
        if(getUser){
            const requestRecord = await VRSchema.findOneAndUpdate({user_id: getUser._id},{
                request_status: 'completed'
            })
            return res.status(200).json({
                success: true,
                message: 'User verified successfully'
            })
        }
        return res.status(200).json({
            success: false,
            message: 'User does not exist'
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

exports.getVRequests = async (req, res, next) => {
    try{
        const vRequests = await VRSchema.find(
            {request_status: 'pending', user_type: { $ne: 'patient' } })
        if(vRequests.length > 0){
            return res.status(200).json({
                success: true,
                requests: vRequests
            })
        }
        return res.status(200).json({
            success: true,
            requests: []
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

exports.getPatientUsers = async (req, res, next) => {
    try{
        const patientUsers = await userSchema.find({user_type: 'patient', 'admin_verified.data': 'false'});
        let decryptedPatientsUsers = [],len = patientUsers.length
        if(len > 0){
            for(let i=0;i<len;i++){
                const keyStored = await tools.getKeyRestStored('user',patientUsers[i]._id)
                decryptedPatientsUsers.push({
                    id: patientUsers[i]._id,
                    name: tools.decryptInAES(keyStored.key_used,keyStored.iv_used,patientUsers[i].name.data,patientUsers[i].name.tag),
                    email: tools.decryptInAES(keyStored.key_used,keyStored.iv_used,patientUsers[i].email.data,patientUsers[i].email.tag)
                })
            }
            return res.status(200).json({
                success: true,
                patient_users: decryptedPatientsUsers
            })
        }
        return res.status(200).json({
            success: true,
            patient_users: []
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}