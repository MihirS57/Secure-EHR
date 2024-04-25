const express = require('express')
const router = express.Router()
const {getHandshakeData} = require('../Controllers/handshake')
router.route('/').get(getHandshakeData)
module.exports = router;
