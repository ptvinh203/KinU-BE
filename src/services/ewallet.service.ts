import { NotificationService } from '@src/services/notification.service'
import { TypeSprinding } from './../models/TypeSprinding'
import { AppDataSource } from "@src/config/data-source"
import BadRequestError from "@src/errors/BadRequestError"
import NotFoundError from "@src/errors/NotFoundError"
import { Account } from "@src/models/Account"
import { EWallet } from "@src/models/EWallet"
import { Expenditure } from "@src/models/Expenditure"
import { Request } from "express"

const userRepository = AppDataSource.getRepository(Account)
const ewalletRepository = AppDataSource.getRepository(EWallet)
const expenditureRepository = AppDataSource.getRepository(Expenditure)
const typeSprindingRepository = AppDataSource.getRepository(TypeSprinding)

const linkEWallet = async (req: Request) => {
  const { userId, phone, pinCode, balance } = req.body
  if (!userId || !phone || !pinCode) {
    throw new BadRequestError("Tham số req không hợp lệ!")
  }

  const user = await userRepository.findOne({ where: { id: Number(userId) } })
  if (!user) {
    throw new NotFoundError("Không tìm thấy thông tin người dùng!")
  }

  const linkedEwallet = await ewalletRepository.findOne({ where: { phone } })
  if (linkedEwallet) {
    throw new BadRequestError("Số điện thoại đã được liên kết với ví điện tử")
  }

  const existingUserWallet = await ewalletRepository.findOne({ where: { user } })
  if (existingUserWallet) {
    throw new BadRequestError("Người dùng này đã có ví điện tử liên kết!")
  }

  const ewallet = ewalletRepository.create({
    user,
    phone: phone,
    pinCode,
    balance
  })
  const savedEWallet = await ewalletRepository.save(ewallet)
  return savedEWallet
}

const unlinkEWallet = async (req: Request) => {
  const ewalletId = req.params.ewalletId
  if (!ewalletId) {
    throw new BadRequestError("Tham số ewalletId không hợp lệ!")
  }

  const ewallet = await ewalletRepository.findOne({ where: { id: Number(ewalletId) } })
  if (!ewallet) {
    throw new NotFoundError("Không tìm thấy ví!")
  }

  await ewalletRepository.remove(ewallet)

  return { message: 'Hủy liên kết ví thành công!' }
}

const payment = async (req: Request) => {
  const { price, msg, user_email: phone } = req.body
  if (!price || !msg || !phone) {
    throw new BadRequestError('Tham số từ req không hợp lệ!')
  }

  const type = msg.split(' ')[0]
  let isTypeInMsg = false

  const wallet = await ewalletRepository.findOne({ where: { phone }, relations: ['user'] })
  if (!wallet) throw new NotFoundError('Tài khoản chưa liên kết ví!')
  if (!wallet.user) throw new NotFoundError('Không tìm thấy người dùng!')
  const user = wallet.user

  let typeSprinding = await typeSprindingRepository.findOne({ where: { abbreviation: type, user } })
  if (!typeSprinding) {
    typeSprinding = await typeSprindingRepository.findOne({ where: { abbreviation: '', user } })
  } else {
    isTypeInMsg = true
  }

  const newExpenditure: Expenditure = expenditureRepository.create({
    name: isTypeInMsg ? msg.replace(`${type} `, '') : msg,
    typeSprinding: typeSprinding || undefined,
    amount: +price,
    dateSpinding: new Date(),
    user,
    paymentType: true
  })

  const savedExpenditure = await expenditureRepository.save(newExpenditure)
  await NotificationService.createNotification(savedExpenditure)

  return savedExpenditure
}

export const EWalletService = {
  linkEWallet,
  unlinkEWallet,
  payment
}