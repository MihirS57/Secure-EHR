const mongoose = require('mongoose')
const keyPairSchema = mongoose.Schema({
    tag: {
        type: String,
        required: ['true','Tag is mandatory']
    },
    private_key: {
        type: String,
        required: ['true','SK is mandatory'],
    },
    public_key: {
        type: String,
        required: ['true','PK is mandatory'],
    }
})

module.exports = mongoose.model('KeyPair',keyPairSchema);