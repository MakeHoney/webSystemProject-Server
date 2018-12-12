import express from 'express'
import authCheck from '../middlewares/auth-check'
import { controller } from './controller'
import { mountSpace } from '../../../test/helper/migration'
const router = express.Router()

import { Space } from '../../models'

// router.use(authCheck)

router.post('/reserve', controller.reserveSpace)
router.post('/cancel-reservation', controller.cancelReservation)
router.post('/test', async (req, res) => {
  try {
    const {placeName, spaceID} = req.body
    const result = await Space.findOne({placeName, spaceID})
    res.send({
      message: result
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})
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
