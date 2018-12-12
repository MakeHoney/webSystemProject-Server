import express from 'express'
import auth from './auth'
import library from './library'
import space from './space'

const router = express.Router()

router.use('/auth', auth)
router.use('/library', library)
router.use('/space', space)

export default router
