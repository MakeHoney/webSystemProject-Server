import express from 'express'
import { controller } from './controller'
import authCheck from "../middlewares/auth-check";
// import { mountSeat2 } from '../../../test/helper/migration'

const router = express.Router()

router.use(authCheck)

// POST /library/reserve
// POST /library/return
// POST /library/extend

router.get('/list', controller.seatList)
router.post('/reserve', controller.reserveSeat)
router.post('/return', controller.returnSeat)
router.post('/extend', controller.extendSeat)

// router.get('/mount', async (req, res) => {
//   try {
//     await mountSeat2(0, 0, 500, 326)
//     res.json({
//       message: 'success'
//     })
//   } catch (err) {
//     res.status(500).json({
//       message: err.message
//     })
//   }
// })

export default router
