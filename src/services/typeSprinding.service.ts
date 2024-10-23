import { AppDataSource } from '@src/config/data-source'
import BadRequestError from '@src/errors/BadRequestError'
import NotFoundError from '@src/errors/NotFoundError'
import ValidationError from '@src/errors/ValidationError'
import { Account } from '@src/models/Account'
import { Color } from '@src/models/Color'
import { Icon } from '@src/models/Icon'
import { TypeSprinding } from '@src/models/TypeSprinding'
import { validate } from 'class-validator'
import { NextFunction, Request } from 'express'

const typeSprindingRepository = AppDataSource.getRepository(TypeSprinding)
const iconRepository = AppDataSource.getRepository(Icon)
const colorRepository = AppDataSource.getRepository(Color)
const accountRepository = AppDataSource.getRepository(Account)
const creatTypeSprinding = async (req: Request) => {
  try {
    const { name, estimatedAmount, abbreviation, iconId, colorId, userId } =
      req.body
    // Tìm các thực thể liên quan
    const icon = await iconRepository.findOne({ where: { id: iconId } })
    const color = await colorRepository.findOne({ where: { id: colorId } })
    const user = await accountRepository.findOne({ where: { id: userId } })
    if (!icon || !color || !user) {
      throw new NotFoundError('Icon Or Color Or User Không tồn tại')
    }
    if (!user) {
      throw new NotFoundError('User Không tồn tại')
    }
    // Kiểm tra abbreviation có bị trùng không
    const existingTypeSprinding = await typeSprindingRepository.findOne({
      where: { abbreviation, user: { id: userId } }
    })
    if (existingTypeSprinding) {
      throw new ValidationError('Kí tự viết tắt đã tồn tại')
    }
    const typeSprinding = typeSprindingRepository.create({
      name,
      estimatedAmount,
      abbreviation,
      icon,
      color,
      user
    })

    // Validate dữ liệu với class-validator (đảm bảo name không rỗng)
    const errors = await validate(typeSprinding)
    if (errors.length > 0) {
      throw new BadRequestError('Tên bị rỗng')
    }
    // Lưu vào database
    const savedTypeSprinding = await typeSprindingRepository.save(typeSprinding)

    return savedTypeSprinding
  } catch (error) {
    throw error
  }
}

//Sửa
const updateTypeSprinding = async (id: number, req: Request) => {
  try {
    const { name, estimatedAmount, abbreviation, iconId, colorId } = req.body
    // Tìm kiếm TypeSprinding theo id
    const typeSprinding = await typeSprindingRepository.findOne({
      where: { id },
      relations: ['icon', 'color']
    })
    if (!typeSprinding) {
      throw new NotFoundError('TypeSprinding Không tồn tại')
    }

    // Cập nhật các thuộc tính nếu có dữ liệu
    if (name !== undefined) {
      typeSprinding.name = name
    }
    if (estimatedAmount !== undefined) {
      typeSprinding.estimatedAmount = estimatedAmount
    }
    if (abbreviation !== undefined) {
      typeSprinding.abbreviation = abbreviation
    }

    // Tìm color nếu có colorId
    if (colorId !== undefined) {
      const color = await colorRepository.findOne({ where: { id: colorId } })
      if (!color) {
        throw new NotFoundError('Color với colorId Không tồn tại')
      }
      typeSprinding.color = color
    }

    // Tìm icon nếu có iconId
    if (iconId !== undefined) {
      const icon = await iconRepository.findOne({ where: { id: iconId } })
      if (!icon) {
        throw new NotFoundError('Icon với iconId Không tồn tại')
      }
      typeSprinding.icon = icon
    }
    // Lưu thay đổi
    const typeSprindingUpdate =
      await typeSprindingRepository.save(typeSprinding)

    return typeSprindingUpdate
  } catch (error) {
    throw error
  }
}

//Xóa
const deleteTypeSprinding = async (id: number) => {
  try {
    // Tìm kiếm TypeSprinding theo id
    const typeSprinding = await typeSprindingRepository.findOne({
      where: { id }
    })
    if (!typeSprinding) {
      throw new NotFoundError('TypeSprinding Không tồn tại')
    }

    // Xóa TypeSprinding
    await typeSprindingRepository.remove(typeSprinding)

    return { message: 'TypeSprinding đã được xóa thành công' }
  } catch (error) {
    throw error
  }
}

const getAllTypeSprindings = async () => {
  try {
    const typeSprindings = await typeSprindingRepository.find({
      relations: ['icon', 'color', 'user']
    })
    return typeSprindings
  } catch (error) {
    throw error
  }
}
const getTypeSprindingById = async (id: number) => {
  try {
    // Tìm TypeSprinding theo ID
    const typeSprinding = await typeSprindingRepository.findOne({
      where: { id },
      relations: ['icon', 'color', 'user']
    })
    console.log('🚀 ~ getTypeSprindingById ~ id:', id)
    if (!typeSprinding) {
      throw new NotFoundError('TypeSprinding không tồn tại')
    }
    return typeSprinding
  } catch (error) {
    throw error
  }
}
export const TypeSprindingService = {
  creatTypeSprinding,
  updateTypeSprinding,
  deleteTypeSprinding,
  getAllTypeSprindings,
  getTypeSprindingById
}
