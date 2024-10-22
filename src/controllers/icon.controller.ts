import { IconService } from '@src/services/icon.service'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const getAllIcon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await IconService.getAllIcon()
    res.status(StatusCodes.OK).json({
      status: 'OK',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const IconController = {
  getAllIcon
}
