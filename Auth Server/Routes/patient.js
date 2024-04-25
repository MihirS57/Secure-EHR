const express = require('express')
const router = express.Router()
const {addPatient, deletePatient, updatePatient, getPatient} = require('../Controllers/patient')

router.route('/add').post(addPatient)
router.route('/update').put(updatePatient)
router.route('/delete').delete(deletePatient)
router.route('/get').get(getPatient)

module.exports = router