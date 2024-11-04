import BadRequestError from '@src/errors/BadRequestError'
import NotFoundError from '@src/errors/NotFoundError'
import { Request, Response, NextFunction } from 'express'
import { ExpenditureService } from '@src/services/expenditure.service'
import { StatusCodes } from 'http-status-codes'

const createExpenditure = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ExpenditureService.createExpenditure(req)
    return res.status(StatusCodes.CREATED).json({
      status: 'CREATED',
      data: result
    })
  } catch (error) {
    next(error)
  }
}
export const ExpenditureController = {
  createExpenditure
}
