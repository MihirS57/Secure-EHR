const crypto = require('crypto');
const {contactAuthServer} = require('../middleware/contactAuth')
const keyPair = require('../models/keyPair')
exports.getHandshakeData = async (req,res,next) => {
    try{
        const cnt = await keyPair.countDocuments()
        let privateKey = null
        let publicKey = null
        if(cnt === 1){
            const kp = await keyPair.findOne({tag: 'key-pair'})
            privateKey = kp.private_key
            publicKey = kp.public_key
            console.log('1',kp.public_key,publicKey)
        }else{
            //ref: https://stackoverflow.com/a/58922095
            const { secret_key, public_key } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 2048,
                publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
                },
                privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
                }
            }); 
            console.log(secret_key,public_key)
            privateKey = secret_key
            publicKey = public_key
            
        }
        console.log(publicKey)
        const response = contactAuthServer(
            'GET', 
            {
                'content-type': 'application/json',
            }, 
            'key/public', 
            publicKey)
        console.log('2',response)
        if(response.data.success){
            return res.status(200).json({
                success: true,
                public_key: kp.public_key,
                certificate_details: {
                    ca_public_key: response.data.cert_public_key,
                    signature: response.data.sign
                }
            })
        }else{
            return res.status(400).json(response.data)
        }
        
    }catch(err){
        return res.status(404).json({
            success: false,
            error: err.message
        })
    }
}