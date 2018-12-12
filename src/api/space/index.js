import express from 'express'
import authCheck from '../middlewares/auth-check'
import { mountSpace } from '../../../test/helper/migration'
const router = express.Router()

// router.use(authCheck)

router.post('/reserve')
router.post('/cancel-reservation')


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
