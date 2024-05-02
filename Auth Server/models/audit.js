const mongoose = require('mongoose')
const connectDB = require('../config/db')
let {connKey,connDB} = connectDB()

const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'PT', // Set your desired time zone here
    timeZoneName: 'short' // This will display the abbreviated time zone name
};

const auditSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        get: function() {
            return this._id.getTimestamp().toLocaleString('en-US', options);
        }
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
module.exports = connDB.model('audit',auditSchema);