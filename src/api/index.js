import express from 'express'
import auth from './auth'
import library from './library'
import place from './place'

const router = express.Router()

router.use('/auth', auth)
router.use('/library', library)
router.use('/place', place)

export default router
