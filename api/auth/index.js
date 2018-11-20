import express from 'express'
import { controller } from './controller'
const router = express.Router()

router.post('/register', controller.register)
router.post('/login', controller.login)
// router.get('/check', controller.check)

export default router
