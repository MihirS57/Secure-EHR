const mongoose = require('mongoose')
const connectDB = require('../config/db')
let {connKey,connDB} = connectDB()
const patientSchema = mongoose.Schema({
    name: {
        data: {
            type: String,
            required: ['true','Name is mandatory']
        },
        tag: {
            type: String,
        }
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: ['true','Patient ID is mandatory'],
        ref: 'user'
    },
    age: {
        data: {
            type: String,
            required: ['true','Age is mandatory']
        },
        tag: {
            type: String
        }
        
    },
    blood_group: {
        data: {
            type: String,
            required: ['true','Blood Group is mandatory']
        },
        tag: {
            type: String
        }
        
    }, 
    disease: {
        data: {
            type: String,
            required: ['true','Disease is mandatory']
        },
        tag: {
            type: String
        }
    },
    medication: {
        data: {
            type: String,
            required: ['true','Medication is mandatory']
        },
        tag: {
            type: String
        }
    },
    emergency_contact: {
        name: {
            data: {
                type: String,
                required: ['true','Emergency Contact is required']
            },
            tag: {
                type: String
            }
            
        },
        contact_details: {
            data: {
                type: String,
                required: ['true','E Contact Details is mandatory']
            },
            tag: {
                type: String
            }
            
        }
    }
})
module.exports = connDB.model('patient',patientSchema);