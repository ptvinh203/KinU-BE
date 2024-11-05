import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { Account } from '../models/Account'
import { AppDataSource } from '../config/data-source'
import NotFoundError from '@src/errors/NotFoundError'
import UnauthorizedError from '@src/errors/UnauthorizedError'
import BadRequestError from '@src/errors/BadRequestError'

const login = async (req: Request) => {
  try {
    const { username, password } = req.body
    const userRepo = AppDataSource.getRepository(Account)
    if(!username || !password){
      throw new BadRequestError("Tham số username và password không hợp lệ!")
    }
    const existingAccount = await userRepo.findOne({ where: { username } })

    if (!existingAccount) {
      throw new NotFoundError('Tài khoản không hợp lệ!')
    }

    const isMatch = await bcrypt.compare(password, existingAccount.password)
    if (!isMatch) {
      throw new UnauthorizedError('Mật khẩu không chính xác!')
    }

    return existingAccount
  } catch (error) {
    throw error
  }
}

export const AuthService = {
  login
}
