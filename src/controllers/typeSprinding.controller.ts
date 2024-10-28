import { NextFunction, Request, Response } from 'express'
import { TypeSprindingService } from '@src/services/typeSprinding.service'
import { StatusCodes } from 'http-status-codes'

const CreateTypeSprinding = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTypeSprinding = await TypeSprindingService.creatTypeSprinding(req)
    res.status(StatusCodes.OK).json({
      status: 'OK',
      data: newTypeSprinding
    })
  } catch (error) {
    next(error)
  }
}

export const TypeSprindingController = {
  CreateTypeSprinding
}
