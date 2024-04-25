const axios = require('axios')
const contactAuthServer = require('../middleware/contactAuth')
exports.login = (req,res,next) => {
    contactAuthServer(
        'GET',
        {
            'content-type': 'application/json',
        },
        '/auth/login',
        req,res
    )
}

exports.register = (req,res,next) => {
    contactAuthServer(
        'POST',
        {
            'content-type': 'application/json',
        },
        '/auth/register',
        req,res
    )
}

exports.addPatient = (req,res,next) => {
    contactAuthServer(
        'POST',
        {
            'content-type': 'application/json',
        },
        '/patient/add',
        req,res
    )
}

exports.getPatient = (req,res,next) => {
    contactAuthServer(
        'GET',
        {
            'content-type': 'application/json',
        },
        '/patient/get',
        req,res
    )
}

exports.updatePatient = (req,res,next) => {
    contactAuthServer(
        'PUT',
        {
            'content-type': 'application/json',
        },
        '/patient/update',
        req,res
    )
}

exports.deletePatient = (req,res,next) => {
    contactAuthServer(
        'DELETE',
        {
            'content-type': 'application/json',
        },
        '/patient/delete',
        req,res
    )
}

exports.getAudit = (req,res,next) => {
    contactAuthServer(
        'GET',
        {
            'content-type': 'application/json',
        },
        '/audit/get',
        req,res
    )
}

exports.verifyUser = (req,res,next) => {
    contactAuthServer(
        'POST',
        {
            'content-type': 'application/json',
        },
        '/auth/verify',
        req,res
    )
}

exports.getRequests = (req,res,next) => {
    contactAuthServer(
        'GET',
        {
            'content-type': 'application/json',
        },
        '/auth/vRequests',
        req,res
    )
}