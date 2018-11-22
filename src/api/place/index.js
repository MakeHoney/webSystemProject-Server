import express from 'express'
import authCheck from '../middlewares/auth-check'
const router = express.Router()

router.use(authCheck)
router.post('/reserve')
router.post('/cancel-reservation')

export default router
