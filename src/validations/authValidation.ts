import ValidationError from '@src/errors/ValidationError'
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = Joi.object({
    username: Joi.string().required().min(3).max(30).trim().strict(),
    password: Joi.string().required().min(3).max(30).trim().strict(),
    email: Joi.string().email().required(),
    fullname: Joi.string().required().trim().strict(),
    phone: Joi.string().required(),
    birthday: Joi.date().iso().required(),
    gender: Joi.number().integer().valid(-1, 0, 1).required()
  })

  try {
    const value = await user.validateAsync(req.body, { abortEarly: false })
    console.log('Validated Data:', value) // Kiểm tra dữ liệu đã validate

    next()
  } catch (error) {
    next(new ValidationError(error.message))
  }
}

export const accountValidation = {
  createAccount
}
