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

const updateExpenditure = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ExpenditureService.updateExpenditure(req)
    return res.status(StatusCodes.OK).json({
      status: 'OK',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const deleteExpenditure = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ExpenditureService.deleteExpenditure(req)
    res.status(StatusCodes.OK).json({
      status: 'OK',
      message: result.message
    })
  } catch (error) {
    next(error)
  }
}

const getAllExpenditures = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const listExpenditure = await ExpenditureService.getAllExpenditures(req)
    if (listExpenditure.length === 0) {
      return res.status(StatusCodes.OK).json({
        status: 'OK',
        message: 'Chưa có loại chi tiêu'
      })
    }

    return res.status(StatusCodes.OK).json({
      status: 'OK',
      data: listExpenditure
    })
  } catch (error) {
    next(error)
  }
}

const getExpenditureById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expenditure = await ExpenditureService.getExpenditureById(req)
    res.status(StatusCodes.OK).json({
      status: 'OK',
      data: expenditure
    })
  } catch (error) {
    next(error)
  }
}
export const ExpenditureController = {
  createExpenditure,
  updateExpenditure,
  deleteExpenditure,
  getAllExpenditures,
  getExpenditureById
}
