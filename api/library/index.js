import express from 'express'
import { reserve, mount } from './controller'
const router = express.Router()

router.post('/reserve', reserve)
router.post('/db-mount', mount)

module.exports = router
