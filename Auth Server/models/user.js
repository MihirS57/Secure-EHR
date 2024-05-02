const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const connectDB = require('../config/db')
let {connKey,connDB} = connectDB()
const userSchema = mongoose.Schema({
    name: {
        data: {
            type: String,
            required: ['true','Name is mandatory']
        },
        tag: {
            type: String,
        }
    },
    unique_id: {
        type: String,
        required: ['true','Unique ID is mandatory'],
        unique: ['true','Unique ID must be unique']
    },
    email: {
        data: {
            type: String,
            required: ['true','Email is mandatory'],
            unique: ['true','Email should be unique']
        },
        tag: {
            type: String
        }
    },
    password: {
        data: {
            type: String,
            required: ['true','Password is mandatory'],
        },
        tag: {
            type: String
        }
    },
    user_type: {
        type: String,
        enum: ['admin','patient','audit-1','audit-2','audit-3'],
        required: ['true','User role is mandatory']
    },
    admin_verified: {
        data: {
            type: String,
            required: ['true']
        },
        tag: {
            type: String
        }
    }

})
userSchema.methods.getSignedUserToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRY
    });
}

module.exports = connDB.model('user',userSchema);