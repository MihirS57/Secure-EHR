const mongoose = require('mongoose')
const keyTransitSchema = mongoose.Schema({
    key_used: {
        type: String,
        required: ['true','Key is mandatory'],
        unique: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: ['true','Foreign ID is mandatory'],
        ref: 'user'
    }
})

module.exports = mongoose.model('KeyTransit',keyTransitSchema);