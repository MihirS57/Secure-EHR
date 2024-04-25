const mongoose = require('mongoose')
const keyRestSchema = mongoose.Schema({
    table_name: {
        type: String,
        required: ['true','Table name is mandatory'],
        unique: false
    },
    key_used: {
        type: String,
        required: ['true','Key is mandatory']
    },
    iv_used: {
        type: String,
        required: ['true','IV is mandatory']
    },
    document_id: {
        type: mongoose.Schema.ObjectId,
        required: ['true','Document ID is mandatory']
    }
})

module.exports = mongoose.model('KeyRest',keyRestSchema);