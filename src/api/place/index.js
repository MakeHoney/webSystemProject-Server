import express from 'express'
import authCheck  from '../middlewares'
const router = express.Router()

router.use(authCheck)
router.post('/reserve')
router.post('/cancel-reservation')

export default router
