const express = require('express')
const router = express.Router()

// middleware로 인증 처리 필요

router.use('/auth', require('./auth'))
router.use('/library', require('./library'))

module.exports = router
