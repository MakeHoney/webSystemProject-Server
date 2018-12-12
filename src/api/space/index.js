import express from 'express'
import authCheck from '../middlewares/auth-check'
import { controller } from './controller'
import { mountSpace } from '../../../test/helper/migration'
const router = express.Router()

// router.use(authCheck)

router.post('/reserve', controller.reserveSpace)
router.post('/cancel-reservation', controller.cancelReservation)
router.post('/list', controller.spaceListOfPlace)

router.get('/mount', async (req, res) => {
  try {
    await mountSpace()
    res.json({
      message: 'success'
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

export default router
