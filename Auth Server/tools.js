const crypto = require('crypto');
const keyRest = require('./models/keyRest')
//Sourced from https://medium.com/@tony.infisical/guide-to-nodes-crypto-module-for-encryption-decryption-65c077176980
function getKeyData(){
    const iv = crypto.randomBytes(12).toString('hex');
    const key = crypto.randomBytes(32).toString('hex');
    return {iv,key}
}

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

async function storeKeyRest(table_name, key, iv, document_id){
    const addKeyRest = await keyRest.create({
        table_name: table_name,
        key_used: key,
        iv_used: iv,
        document_id: document_id
    })
    return addKeyRest
}

async function getKeyRestStored(table_name, document_id){
    const getKeyRest = await keyRest.findOne({
        table_name: table_name,
        document_id: document_id
    })
    return getKeyRest
}


module.exports = {
    getKeyData,
    encryptInAES,
    decryptInAES,
    storeKeyRest,
    getKeyRestStored
}