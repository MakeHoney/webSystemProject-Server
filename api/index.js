import express from 'express'
import auth from './auth'
import library from './library'
const router = express.Router()
// middleware로 인증 처리 필요

router.use('/auth', auth)
router.use('/library', library)

module.exports = router
