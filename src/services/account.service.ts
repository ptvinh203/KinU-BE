import { Request, Response } from 'express'
import { Account } from '../models/Account'
import { AppDataSource } from '../config/data-source'
import BadRequestError from '@src/errors/BadRequestError'
import bcrypt from 'bcryptjs'

const createAccount = async (req: Request) => {
  try {
    const { username, password, email, fullname, phone, birthday, gender } =
      req.body
    const userRepo = AppDataSource.getRepository(Account)
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
    return newUser
  } catch (error) {
    throw error
  }
}

const getAllAccounts = async (req: Request) => {
  try {
    const userRepo = AppDataSource.getRepository(Account)
    const accounts = await userRepo.find()
    return accounts
  } catch (error) {
    throw error
  }
}

export const AccountService = {
  createAccount,
  getAllAccounts
}
