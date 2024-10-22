import { ColorService } from '@src/services/color.service'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const getAllColors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ColorService.getAllColor()
    res.status(StatusCodes.OK).json({
      status: 'OK',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const ColorController = {
  getAllColors
}
