import express from 'express'
import { ColorController } from '@src/controllers/color.controller'

const router = express.Router()
router.get('/', ColorController.getAllColors)

export default router
