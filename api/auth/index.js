import express from 'express'
import authCheck from '../middlewares/auth-check'
import { register, login, check } from './controller'
const router = express.Router()


router.use('/check', authCheck)

router.post('/register', register)
router.post('/login', login)
router.get('/check', check)

module.exports = router
