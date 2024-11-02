import { AuthController } from '@src/controllers/auth.controller'
import { AccountController } from '../controllers/account.controller'
import express from 'express'

const router = express.Router()

router.route('/login').post(AuthController.login)

export default router
