import { TypeSprindingController } from '@src/controllers/typeSprinding.controller'
import express from 'express'

const router = express.Router()
router.get('/', TypeSprindingController.GetAllTypeSprindings)
router.post('/create', TypeSprindingController.CreateTypeSprinding)
router.put('/update/:id', TypeSprindingController.UpdateTypeSprinding)
router.delete('/delete/:id', TypeSprindingController.DeleteTypeSprinding)
router.get('/:id', TypeSprindingController.GetTypeSprindingById)

export default router
