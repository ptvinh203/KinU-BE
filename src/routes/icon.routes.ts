import express from 'express'
import { IconController } from '@src/controllers/icon.controller'

const router = express.Router()
router.get('/', IconController.getAllIcon)

export default router
