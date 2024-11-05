import express from 'express'
import { ExpenditureController } from '@src/controllers/expenditure.controller'

const router = express.Router()
router.post('/', ExpenditureController.createExpenditure)
router.put('/update/:id', ExpenditureController.updateExpenditure)
router.delete('/delete/:id', ExpenditureController.deleteExpenditure)
export default router
