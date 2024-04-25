const auditSchema = require('../models/audit')
exports.getAuditData = async (req,res,next) => {
    try{
        const {user,patient_id} = req.body
        if(user.user_type == 'patient'){
            const auditData = await auditSchema.find({patient_id: patient_id})
            if(!auditData){
                return res.status(400).json({
                    success: false,
                    message: 'No audit logs found for your user'
                })
            }
            return res.status(200).json({
                success: true,
                audit: auditData
            })
        }else{
            const auditData = await auditSchema.find()
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