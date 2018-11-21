import express from 'express'
import { controller } from './controller'
const router = express.Router()

router.get('/register', controller.register)
router.post('/send-auth-mail', controller.sendAuthMail)
router.post('/login', controller.login)
// router.get('/check', controller.check)

export default router
