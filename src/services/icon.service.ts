import { AppDataSource } from '@src/config/data-source'
import ValidationError from '@src/errors/ValidationError'
import { Icon } from '@src/models/Icon'

const iconRepository = AppDataSource.getRepository(Icon)

const getAllIcon = async () => {
  try {
    const icons = await iconRepository.find()
    // Kiểm tra nếu colors rỗng
    if (icons.length === 0) {
      throw new ValidationError('Không có màu nào trong cơ sở dữ liệu') // Có thể dùng ValidationError hoặc CustomAPIError khác
    }
    return icons
  } catch (error) {
    throw error
  }
}

export const IconService = {
  getAllIcon
}
