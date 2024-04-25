const express = require('express')
const router = express.Router()
const {getAuditData} = require('../Controllers/audit')

router.route('/get').get(getAuditData)
router.route('/update')
router.route('/delete')

module.exports = router