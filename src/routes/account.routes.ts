import { AccountController } from '../controllers/account.controller'
import express from 'express'
import { accountValidation } from '@src/validations/authValidation'

const router = express.Router()

router
  .route('/')
  .post(accountValidation.createAccount, AccountController.createAccount)
router.route('/').get(AccountController.getAllAccounts)
router.route('/id').get(AccountController.getAccountById)

export default router
