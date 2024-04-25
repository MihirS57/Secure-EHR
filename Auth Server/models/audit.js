const mongoose = require('mongoose')
const auditSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    patient_id: [{
        type: mongoose.Schema.ObjectId,
        required: ['true','Patient ID is mandatory'],
        ref: 'user'
    }],
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: ['true','Patient ID is mandatory'],
        ref: 'user'
    },
    action_type: {
        type: String,
        enum: ['create', 'delete', 'change', 'query', 'print'],
        required: ['true','Action Type is mandatory']
    },

})
module.exports = mongoose.model('audit',auditSchema);