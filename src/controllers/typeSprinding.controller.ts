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
const UpdateTypeSprinding = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const parsedId = parseInt(id as string, 10)
    if (isNaN(parsedId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'Invalid ID provided'
      })
    }

    const updatedType = await TypeSprindingService.updateTypeSprinding(
      parsedId,
      req
    )

    res.status(StatusCodes.OK).json({
      status: 'OK',
      data: updatedType
    })
  } catch (error) {
    next(error)
  }
}

// Xóa TypeSprinding
const DeleteTypeSprinding = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params 

    const parsedId = parseInt(id as string, 10)
    if (isNaN(parsedId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'Invalid ID provided'
      })
    }

    const result = await TypeSprindingService.deleteTypeSprinding(parsedId)

    res.status(StatusCodes.OK).json({
      status: 'OK',
      message: result.message
    })
  } catch (error) {
    next(error)
  }
}
const GetAllTypeSprindings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const typeSprindings = await TypeSprindingService.getAllTypeSprindings(req)

    res.status(StatusCodes.OK).json({
      status: 'OK',
      data: typeSprindings
    })
  } catch (error) {
    next(error)
  }
}

const GetTypeSprindingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    // Parse id để đảm bảo đó là số hợp lệ
    const parsedId = parseInt(id as string, 10)
    if (isNaN(parsedId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'ID không hợp lệ'
      })
    }

    const typeSprinding =
      await TypeSprindingService.getTypeSprindingById(parsedId)

    res.status(StatusCodes.OK).json({
      status: 'OK',
      data: typeSprinding
    })
  } catch (error) {
    next(error)
  }
}

export const TypeSprindingController = {
  CreateTypeSprinding,
  UpdateTypeSprinding,
  DeleteTypeSprinding,
  GetAllTypeSprindings,
  GetTypeSprindingById,
}
