import express from 'express'
import { ExpenditureController } from '@src/controllers/expenditure.controller'

const router = express.Router()
router.post('/', ExpenditureController.createExpenditure)
export default router
