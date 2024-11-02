import { AppDataSource } from '@src/config/data-source'
import BadRequestError from '@src/errors/BadRequestError'
import NotFoundError from '@src/errors/NotFoundError'
import ValidationError from '@src/errors/ValidationError'
import { Account } from '@src/models/Account'
import { Color } from '@src/models/Color'
import { Expenditure } from '@src/models/Expenditure'
import { Icon } from '@src/models/Icon'
import { TypeSprinding } from '@src/models/TypeSprinding'
import { validate } from 'class-validator'
import {  Request } from 'express'
import typeSprindingSpentAmount from '../utils/typeSprindingSpentAmount'

const typeSprindingRepository = AppDataSource.getRepository(TypeSprinding)
const iconRepository = AppDataSource.getRepository(Icon)
const colorRepository = AppDataSource.getRepository(Color)
const accountRepository = AppDataSource.getRepository(Account)


const creatTypeSprinding = async (req: Request) => {
  try {
    const { name, estimatedAmount, abbreviation, iconId, colorId, userId } = req.body

    const icon = await iconRepository.findOne({ where: { id: iconId } })
    const color = await colorRepository.findOne({ where: { id: colorId } })
    const user = await accountRepository.findOne({ where: { id: userId } })
    if (!icon || !color || !user) {
      throw new NotFoundError('Icon hoặc Color hoặc User Không tồn tại')
    }
    if (!user) {
      throw new NotFoundError('User Không tồn tại')
    }

    const existingTypeSprinding = await typeSprindingRepository.findOne({
      where: { abbreviation, user: { id: userId } }
    })
    if (existingTypeSprinding) {
      throw new ValidationError('Kí tự viết tắt đã tồn tại')
    }
    const typeSprinding = typeSprindingRepository.create({
      name,
      estimatedAmount: +estimatedAmount,
      abbreviation,
      icon,
      color,
      user
    })

    const errors = await validate(typeSprinding)
    if (errors.length > 0) {
      throw new BadRequestError('Tên bị rỗng')
    }

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

    const typeSprinding = await typeSprindingRepository.findOne({
      where: { id },
      relations: ['icon', 'color']
    })
    if (!typeSprinding) {
      throw new NotFoundError('TypeSprinding Không tồn tại')
    }

    if (name !== undefined) {
      typeSprinding.name = name
    }
    if (estimatedAmount !== undefined) {
      typeSprinding.estimatedAmount = estimatedAmount
    }
    if (abbreviation !== undefined) {
      typeSprinding.abbreviation = abbreviation
    }

    if (colorId !== undefined) {
      const color = await colorRepository.findOne({ where: { id: colorId } })
      if (!color) {
        throw new NotFoundError('Color với colorId Không tồn tại')
      }
      typeSprinding.color = color
    }

    if (iconId !== undefined) {
      const icon = await iconRepository.findOne({ where: { id: iconId } })
      if (!icon) {
        throw new NotFoundError('Icon với iconId Không tồn tại')
      }
      typeSprinding.icon = icon
    }

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
    const typeSprinding = await typeSprindingRepository.findOne({
      where: { id }
    })
    if (!typeSprinding) {
      throw new NotFoundError('TypeSprinding Không tồn tại')
    }

    await typeSprindingRepository.remove(typeSprinding)

    return { message: 'TypeSprinding đã được xóa thành công' }
  } catch (error) {
    throw error
  }
}

const getAllTypeSprindings = async (req: Request) => {
  try {
    const userId = req.query.userId;
    let typeSprindings = [];

    if (userId) {
      typeSprindings = await typeSprindingRepository.find({
        where: { user: { id: +userId } },
        relations: ['icon', 'color', 'expenditure'], 
      });
    } else {
      typeSprindings = await typeSprindingRepository.find({
        relations: ['icon', 'color', 'user', 'expenditure'],
      });
    }

    const result = typeSprindings.map(typeSprinding => {
      const spentAmount = typeSprinding.expenditure ? typeSprindingSpentAmount(typeSprinding.expenditure) : 0
      return {
        ...typeSprinding,
        spentAmount 
      }
    })

    return result
  } catch (error) {
    throw error;
  }
}

const getTypeSprindingById = async (id: number) => {
  try {
    const typeSprinding = await typeSprindingRepository.findOne({
      where: { id },
      relations: ['icon', 'color', 'expenditure']
    })
    if (!typeSprinding) {
      throw new NotFoundError('TypeSprinding không tồn tại')
    }
    if (!typeSprinding.expenditure) {
      throw new BadRequestError("Danh sách chi tiêu không hợp lệ!");
    }

    const spentAmount = typeSprindingSpentAmount(typeSprinding.expenditure)
    return {
      ...typeSprinding,
      spentAmount
    }
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
