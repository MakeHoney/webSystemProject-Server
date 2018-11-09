const express = require('express')
const authCheck = require('../middlewares/auth-check')
const { register, signIn, check } = require('./controller')
const router = express.Router()

router.use('/check', authCheck)

router.post('/sign-in', signIn)
router.post('/sign-up', register)
router.get('/check', check)

module.exports = router
