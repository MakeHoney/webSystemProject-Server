import express from 'express'
import { controller } from './controller'
import authCheck from "../middlewares/auth-check";
const router = express.Router()

router.use(authCheck)

router.post('/reserve', controller.reserveSeat)
router.post('/return', controller.returnSeat)
router.post('/extend', controller.extendSeat)

export default router
