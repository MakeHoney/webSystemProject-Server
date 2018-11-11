const express = require('express')
const router = express.Router()

router.use('/auth', require('./auth'))
router.use('/library', require('./library'))

module.exports = router
