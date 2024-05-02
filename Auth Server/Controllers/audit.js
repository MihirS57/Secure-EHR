const auditSchema = require('../models/audit')
const patientSchema = require('../models/patient')
exports.getAuditData = async (req,res,next) => {
    try{
        const {user,patient_id} = req.body
        if(user.user_type == 'patient'){
            console.log("UID:",user.id)
            const patientData = await patientSchema.findOne({user_id: user.id})
            const auditData = await auditSchema.find({ patient_id: { $in: patientData._id } })
            if(!auditData){
                return res.status(400).json({
                    success: false,
                    message: 'No audit logs found for your user'
                })
            }
            return res.status(200).json({
                success: true,
                num: auditData.length,
                audit: auditData
            })
        }else{
            const auditData = await auditSchema.find().sort({ date: -1 })
            if(!auditData){
                return res.status(400).json({
                    success: false,
                    message: 'No audit logs found'
                })
            }
            return res.status(200).json({
                success: true,
                num: auditData.length,
                audit: auditData
            })
        }
        
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}