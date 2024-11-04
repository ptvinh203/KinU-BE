import { Notification } from '@src/models/Notification'
import { AppDataSource } from '@src/config/data-source'
import BadRequestError from '@src/errors/BadRequestError'
import NotFoundError from '@src/errors/NotFoundError'
import { Account } from '@src/models/Account'
import { Expenditure } from '@src/models/Expenditure'
import { TypeSprinding } from '@src/models/TypeSprinding'
import addSevenHours from '@src/utils/addSevenHours'
import { Request } from 'express'
import { NotificationService } from './notification.service'

const expenditureRepository = AppDataSource.getRepository(Expenditure)
const typeSprindingRepository = AppDataSource.getRepository(TypeSprinding)
const userRepository = AppDataSource.getRepository(Account)
const notificationRepository = AppDataSource.getRepository(Notification)

const createExpenditure = async (req: Request) => {
  try {
    const { name, tsId, amount, userId } = req.body
    console.log(req.body)

    if (!tsId || !amount || !userId || amount < 0) {
      throw new BadRequestError('Dữ liệu từ req không hợp lệ!')
    }

    const user = await userRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundError('Không tìm thấy người dùng!')
    }
    const typeSprinding = await typeSprindingRepository.findOne({
      where: { id: tsId }
    })
    if (!typeSprinding) {
      throw new NotFoundError('Không tìm thấy loại chi tiêu!')
    }

    const newExpenditure: Expenditure = expenditureRepository.create({
      name,
      typeSprinding,
      amount: +amount,
      dateSpinding: addSevenHours(new Date()),
      user,
      paymentType: false
    })
    const savedExpenditure = await expenditureRepository.save(newExpenditure)

    await NotificationService.createNotification(newExpenditure)

    return savedExpenditure
  } catch (error) {
    throw error
  }
}
export const ExpenditureService = {
  createExpenditure
}
