const mongoose = require('mongoose')
const connectDB = require('../config/db')
let {connKey,connDB} = connectDB()
const VRSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: ['true','Patient ID is mandatory'],
        ref: 'user'
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    user_type: {
        type: String
    },
    request_status: {
        type: String,
        enum: ['pending','completed']
    }
})
module.exports = connDB.model('v-requests',VRSchema);