import express from 'express'
import { controller } from './controller'
import authCheck from "../middlewares/auth-check";

import { Seat } from '../../models'
import {mountSeat2} from '../../../test/helper/seats-migration'

const router = express.Router()

router.use(authCheck)

// POST /library/reserve
// POST /library/return
// POST /library/extend
router.get('/mount', async (req, res) => {
  try {
    await mountSeat2(0, 0, 500, 326)
    res.json({
      message: 'success'
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})
router.get('/list', async (req, res) => {
  const seats = await Seat.find()
  console.log(seats)
  res.json({
    seats
  })
})
router.post('/reserve', controller.reserveSeat)
router.post('/return', controller.returnSeat)
router.post('/extend', controller.extendSeat)

export default router
