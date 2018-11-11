const express = require('express')
const authCheck = require('../middlewares/auth-check')
const { register, login, check } = require('./controller')
const router = express.Router()

router.use('/check', authCheck)

router.post('/register', register)
router.post('/login', login)
router.get('/check', check)

const Seat = require('../../models/seat')

router.post('/test-mount', async (req, res) => {
    let { first, second, third, fourth } = req.body
    try {
        await Seat.mount(first, second, third, fourth)
        res.json({
            message: 'mounted!'
        })
    } catch (err) {
        res.status(409).json({
            message: err.message
        })
    }
})

module.exports = router
