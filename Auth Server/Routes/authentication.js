const express = require('express')
const router = express.Router()
const {login,register,validate,verify,getVRequests} = require('../Controllers/authentication')
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/validate').get(validate)
router.route('/vRequests').get(getVRequests)
router.route('/verify').post(verify)
module.exports = router