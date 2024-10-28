import { AppDataSource } from '@src/config/data-source'
import ValidationError from '@src/errors/ValidationError'
import { Color } from '@src/models/Color'

const colorRepository = AppDataSource.getRepository(Color)

const getAllColor = async () => {
  try {
    const colors = await colorRepository.find()
    // Kiểm tra nếu colors rỗng
    if (colors.length === 0) {
      throw new ValidationError('Không có màu nào trong cơ sở dữ liệu') // Có thể dùng ValidationError hoặc CustomAPIError khác
    }
    return colors
  } catch (error) {
    throw error
  }
}

export const ColorService = {
  getAllColor
}
