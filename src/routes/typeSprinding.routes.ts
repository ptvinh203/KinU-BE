import { TypeSprindingController } from '@src/controllers/typeSprinding.controller'
import express from 'express'

const router = express.Router()
router.post('/', TypeSprindingController.CreateTypeSprinding)

export default router
