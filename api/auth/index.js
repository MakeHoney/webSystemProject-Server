import express from 'express'
import authCheck from '../middlewares/auth-check'
import { controller } from './controller'
const router = express.Router()

router.use('/check', authCheck)

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/check', controller.check)

export default router
