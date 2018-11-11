const express = require('express')
const authCheck = require('../middlewares/auth-check')
const { register, login, check } = require('./controller')
const router = express.Router()

router.use('/check', authCheck)

router.post('/register', register)
router.post('/login', login)
router.get('/check', check)

module.exports = router
