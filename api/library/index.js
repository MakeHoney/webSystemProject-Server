import express from 'express'
import { controller } from './controller'
const router = express.Router()

router.post('/reserve', controller.reserveSeat)
router.post('/return', controller.returnSeat)
router.post('/db-mount', controller.mount)

module.exports = router
