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
    // Parse `id` and ensure it’s a number
    const parsedId = parseInt(id as string, 10)
    if (isNaN(parsedId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'Invalid ID provided'
      })
    }
    // Gọi service để cập nhật
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
    const { id } = req.params // Extract id from query parameters

    // Parse id and ensure it’s a valid number
    const parsedId = parseInt(id as string, 10)
    if (isNaN(parsedId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'Invalid ID provided'
      })
    }

    // Gọi service để xóa TypeSprinding
    const result = await TypeSprindingService.deleteTypeSprinding(parsedId)

    // Trả về kết quả thành công
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
    console.log('🚀 ~ parsedId:', parsedId)
    if (isNaN(parsedId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'ID không hợp lệ'
      })
    }

    // Gọi service để tìm TypeSprinding theo ID
    const typeSprinding =
      await TypeSprindingService.getTypeSprindingById(parsedId)

    // Trả về kết quả
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
