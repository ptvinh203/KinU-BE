import { Request, Response } from 'express'
import { Account } from '../models/Account'
import { AppDataSource } from '../config/data-source'
import BadRequestError from '@src/errors/BadRequestError'
import bcrypt from 'bcryptjs'
import { TypeSprinding } from '@src/models/TypeSprinding'
import { Color } from '@src/models/Color'
import { Icon } from '@src/models/Icon'
import NotFoundError from '@src/errors/NotFoundError'

const userRepo = AppDataSource.getRepository(Account)

const createAccount = async (req: Request) => {
  try {
    const { username, password, email, fullname, phone, birthday, gender } =
      req.body
    const existingUserByUsername = await userRepo.findOne({
      where: { username }
    })
    if (existingUserByUsername) {
      throw new BadRequestError('Tên đăng nhập đã tồn tại!')
    }
    const existingUserByEmail = await userRepo.findOne({ where: { email } })
    if (existingUserByEmail) {
      throw new BadRequestError('Email đã tồn tại!')
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = userRepo.create({
      username,
      password: hashedPassword,
      email,
      fullname,
      phone,
      birthday,
      gender
    })

    await userRepo.save(newUser)

    const typeSprindingRepo = AppDataSource.getRepository(TypeSprinding)
    const colorRepo = AppDataSource.getRepository(Color)
    const iconRepo = AppDataSource.getRepository(Icon)

    const defaultColor = await colorRepo.findOne({ where: { id: 1 } })
    if (!defaultColor) {
      throw new NotFoundError("Không tìm thấy color!")
    }
    const defaultIcon = await iconRepo.findOne({ where: { id: 1 } })
    if (!defaultIcon) {
      throw new NotFoundError("Không tìm thấy icon!")
    }

    const newTypeSprinding = typeSprindingRepo.create({
      name: "Chi tiêu khác",
      estimatedAmount: +0,
      abbreviation: '',
      color: defaultColor,
      icon: defaultIcon,
      user: newUser,
    })

    await typeSprindingRepo.save(newTypeSprinding)

    return newUser
  } catch (error) {
    throw error
  }
}

const getAllAccounts = async (req: Request) => {
  try {
    const accounts = await userRepo.find()
    return accounts
  } catch (error) {
    throw error
  }
}

const getAccountById = async (req: Request) => {
  const { id } = req.query
  const account = await userRepo.findOne({ where: { id: Number(id) } })
  if (!account) {
    throw new NotFoundError('Không tìm thấy tài khoản!')
  }
  return account
}

export const AccountService = {
  createAccount,
  getAllAccounts,
  getAccountById
}
