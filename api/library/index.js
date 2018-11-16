import express from 'express'
import { reserveSeat, returnSeat, mount } from './controller'
const router = express.Router()

router.post('/reserve', reserveSeat)
router.post('/return', returnSeat)
router.post('/db-mount', mount)

module.exports = router
