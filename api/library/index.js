const express = require('express')
const router = express.Router()
const { reserve, mount } = require('./controller')

router.post('/reserve', reserve)
router.post('/db-mount', mount)

module.exports = router
