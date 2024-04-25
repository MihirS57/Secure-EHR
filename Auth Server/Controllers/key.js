const keyRest = require('../models/keyRest')
const keyTransit = require('../models/keyTransit')
const keyPair = require('../models/keyPair')
const crypto = require('crypto');
exports.getKeyTransit = async (req,res,next) => {
    try{
        const {user_id} = req.body;
        const fetchKey = await keyTransit.find({user_id: user_id});
        if(fetchKey){
            return res.status(200)
            .json({
                success: true,
                message: "Existing key",
                data: fetchKey
            })
        }
        const key_used = crypto.randomBytes(32).toString('base64');
        // add key in rest with table, in collection
        const keytransit = await keyTransit.create({
            key_used,user_id 
        });
        if(!keytransit){
            return res.status(200).json({
                success:true,
                message: "Could not add new key"
            })
        }
        return res.status(200)
        .json({
            success: true,
            data: keytransit
        })

    }catch(err){
        res.status(400).json({
            success:false,
            error: err.message
        })
    }
}

exports.getKeyRest = async (req,res,next) => {
    try{
        const {table_name,foreign_id} = req.body;
        const fetchKey = await keyRest.find({foreign_id: foreign_id});
        if(fetchKey){
            return res.status(200)
            .json({
                success: true,
                message: "Existing key",
                data: fetchKey
            })
        }
        const key_used = crypto.randomBytes(32).toString('base64');
        // add key in rest with table, in collection
        const keyrest = await keyRest.create({
            table_name,key_used,foreign_id 
        });
        if(!keyrest){
            return res.status(200).json({
                success:true,
                message: "Could not add new key"
            })
        }
        return res.status(200)
        .json({
            success: true,
            data: keyrest
        })
    }catch(err){
        res.status(400).json({
            success:false,
            error: err.message
        })
    }
}

exports.getPKSignature = async (req,res,next) => {
    try{
        const proxyPublicKey = req.body.public_key
        const cnt = await keyPair.countDocuments()
        if(cnt === 1){
            const kp = await keyPair.findOne({tag: 'key-pair'})
            const sign = generateSignature(kp.private_key,proxyPublicKey)
            return res.status(200).json({
                success: true,
                cert_public_key: kp.public_key,
                certificate: sign
            })
        }
        //ref: https://stackoverflow.com/a/58922095
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
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
        const key_pair = await keyPair.create({tag: 'key-pair',private_key: privateKey, public_key: publicKey})
        const sign = generateSignature(privateKey,proxyPublicKey);
        
        return res.status(200).json({
            success: true,
            cert_public_key: publicKey,
            certificate: sign
        })
        
    }catch(err){
        return res.status(200).json({
            success: false,
            error: err.message
        })
    }
}

function generateSignature(key, data){
    var hash = crypto.createHash('sha256').update(data).digest('hex');
    const encryptedData = crypto.privateEncrypt(
        {
          key: key,
          padding: crypto.constants.RSA_PKCS1_PADDING
        },
        Buffer.from(hash)
      ).toString('hex');
    return encryptedData
}
