const express = require('express')
const router = express.Router()
const {getKeyRest,getKeyTransit, getPKSignature} = require('../Controllers/key')
router.route('/rest').get(getKeyRest)
router.route('/transit').get(getKeyTransit)
router.route('/public').get(getPKSignature)
module.exports = router