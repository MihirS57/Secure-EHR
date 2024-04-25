const express = require('express');
const {protect} = require('../middleware/auth')
const { login, register,addPatient, getPatient, updatePatient, deletePatient, getAudit, getRequests, verifyUser } = require('../Controllers/secureServer');
const router = express.Router()
router.route('/login').get(login)
router.route('/register').post(register)
router.route('/addPatient').post(protect,addPatient)
router.route('/updatePatient').put(protect,updatePatient)
router.route('/deletePatient').delete(protect,deletePatient)
router.route('/getPatient').get(protect,getPatient)
router.route('/getAudit').get(protect,getAudit)
router.route('/getVRequests').get( getRequests)
router.route('/verifyUser').post(protect, verifyUser)
module.exports = router;
