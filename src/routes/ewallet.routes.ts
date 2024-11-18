import { EWalletController } from '@src/controllers/ewallet.controller'
import express from 'express'

const router = express.Router()
router.post('/', EWalletController.linkEWallet)
router.post('/payment', EWalletController.payment)
router.delete('/unlink/:ewalletId', EWalletController.unlinkEWallet)

export default router
