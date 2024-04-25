const mongoose = require('mongoose')
const VRSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: ['true','Patient ID is mandatory'],
        ref: 'user'
    },
    request_status: {
        type: String,
        enum: ['pending','completed']
    }
})
module.exports = mongoose.model('v-requests',VRSchema);