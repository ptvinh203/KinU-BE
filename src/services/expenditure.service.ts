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
import { TypeSprindingService } from './typeSprinding.service'

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
const updateExpenditure = async (req: Request) => {
  try {
    const { name, tsId, amount, dateSpinding } = req.body
    const { id } = req.params // Get id  from URL parameters

    if (!id || amount < 0) {
      throw new BadRequestError('Dữ liệu từ req không hợp lệ!')
    }

    // Find the expenditure to update
    const expenditure = await expenditureRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['typeSprinding', 'user']
    })
    if (!expenditure) {
      throw new NotFoundError('Không tìm thấy khoản chi tiêu!')
    }

    // If a new type ID is provided, validate and update it
    if (tsId) {
      const typeSprinding = await typeSprindingRepository.findOne({
        where: { id: tsId }
      })
      if (!typeSprinding) {
        throw new NotFoundError('Không tìm thấy loại chi tiêu!')
      }
      expenditure.typeSprinding = typeSprinding
    }

    // Update other fields if provided
    if (name) expenditure.name = name
    if (amount) expenditure.amount = +amount
    if (dateSpinding)
      expenditure.dateSpinding = addSevenHours(new Date(dateSpinding))

    // Save the updated expenditure
    const updatedExpenditure = await expenditureRepository.save(expenditure)

    return await expenditureRepository.findOne({
      where: { id: updatedExpenditure.id },
      relations: ['typeSprinding', 'user']
    })
  } catch (error) {
    throw error
  }
}
const deleteExpenditure = async (req: Request) => {
  try {
    const { id } = req.params // Get id from URL parameters

    if (!id) {
      throw new BadRequestError('id không hợp lệ!')
    }

    // Find the expenditure to delete
    const expenditure = await expenditureRepository.findOne({
      where: { id: parseInt(id) }
    })
    if (!expenditure) {
      throw new NotFoundError('Không tìm thấy khoản chi tiêu!')
    }

    // Delete the expenditure
    await expenditureRepository.remove(expenditure)

    return { message: 'Xóa khoản chi tiêu thành công!' }
  } catch (error) {
    throw error
  }
}

const getAllExpenditures = async (req: Request) => {
  try {
    const userId = req.query.userId as string
    const tsId = req.query.tsId as string
    let expenditures: Expenditure[] = []

    // Validate userId
    if (!userId) {
      throw new BadRequestError('UserId rỗng')
    }

    // Find user
    const user = await userRepository.findOne({ where: { id: Number(userId) } })
    if (!user) {
      throw new NotFoundError('Người dùng không tìm thấy!')
    }

    // Fetch expenditures based on userId and optional tsId
    if (tsId) {
      // Validate tsId
      if (isNaN(Number(tsId))) {
        throw new BadRequestError('tsId không hợp lệ')
      }

      expenditures = await expenditureRepository.find({
        where: {
          user: { id: Number(userId) },
          typeSprinding: { id: Number(tsId) }
        },
        relations: ['typeSprinding']
      })
    } else {
      expenditures = await expenditureRepository.find({
        where: { user: { id: Number(userId) } },
        relations: ['typeSprinding']
      })
    }

    return expenditures
  } catch (error) {
    throw error
  }
}

const getExpenditureById = async (req: Request) => {
  try {
    const exId = req.params.id
    if (!exId) {
      throw new BadRequestError('Id Khoản chi tiêu rỗng')
    }
    const expenditureId = Number(exId) // Convert to number
    if (isNaN(expenditureId)) {
      throw new BadRequestError('Id Khoản chi tiêu không hợp lệ')
    }
    const expenditure = await expenditureRepository.findOne({
      where: { id: +exId },
      relations: ['typeSprinding']
    })
    return expenditure
  } catch (error) {
    throw error
  }
}
export const ExpenditureService = {
  createExpenditure,
  updateExpenditure,
  deleteExpenditure,
  getAllExpenditures,
  getExpenditureById
}
