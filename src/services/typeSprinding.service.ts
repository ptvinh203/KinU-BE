import { AppDataSource } from '@src/config/data-source'
import BadRequestError from '@src/errors/BadRequestError'
import NotFoundError from '@src/errors/NotFoundError'
import ValidationError from '@src/errors/ValidationError'
import { Account } from '@src/models/Account'
import { Color } from '@src/models/Color'
import { Icon } from '@src/models/Icon'
import { TypeSprinding } from '@src/models/TypeSprinding'
import { validate } from 'class-validator'
import { Request } from 'express'

const typeSprindingRepository = AppDataSource.getRepository(TypeSprinding)
const iconRepository = AppDataSource.getRepository(Icon)
const colorRepository = AppDataSource.getRepository(Color)
const accountRepository = AppDataSource.getRepository(Account)
const creatTypeSprinding = async (req: Request) => {
  try {
    const { name, estimatedAmount, abbreviation, idIcon, idColor, userId } =
      req.body
    // Tìm các thực thể liên quan
    const icon = await iconRepository.findOne({ where: { id: idIcon } })
    const color = await colorRepository.findOne({ where: { id: idColor } })
    const user = await accountRepository.findOne({ where: { id: userId } })
    if (!icon || !color || !user) {
      throw new NotFoundError('Icon Or Color Or User Không tồn tại')
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

export const TypeSprindingService = {
  creatTypeSprinding
}
