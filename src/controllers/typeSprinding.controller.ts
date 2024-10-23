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

// Sửa TypeSprinding
const editTypeSprinding = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { name, estimatedAmount, abbreviation, colorId, iconId } = req.body

    const updatedTypeSprinding = await TypeSprindingService.updateTypeSprinding(id, {
      name,
      estimatedAmount,
      abbreviation,
      colorId,
      iconId
    })

    res.status(StatusCodes.OK).json({
      status: 'OK',
      data: updatedTypeSprinding
    })
  } catch (error) {
    next(error)
  }
}

// Xóa TypeSprinding
const deleteTypeSprinding = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    await TypeSprindingService.deleteTypeSprinding(id)

    res.status(StatusCodes.OK).json({
      status: 'OK',
      message: `TypeSprinding with ID ${id} has been deleted`
    })
  } catch (error) {
    next(error)
  }
}

export const TypeSprindingController = {
  CreateTypeSprinding,
  editTypeSprinding,
  deleteTypeSprinding
}