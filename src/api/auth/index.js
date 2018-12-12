import express from 'express'
import { controller } from './controller'
import authCheck from '../middlewares/auth-check'
const router = express.Router()

router.get('/check', authCheck, controller.check)

router.get('/register', controller.register)
router.post('/send-auth-mail', controller.sendAuthMail)
router.post('/login', controller.login)

router.post('/personal', controller.personalInfo)

export default router
