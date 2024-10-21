import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Account } from './Account'
import { Color } from './Color'
import { Icon } from './Icon'

@Entity()
export class TypeSprinding {
  @PrimaryGeneratedColumn()
  id: number // Tự động tăng

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Số tiền dự tính
  estimatedAmount: number

  @Column({ type: 'varchar' })
  abbreviation: string

  // @Column({ type: 'varchar' })
  // idIcon: string

  // @Column({ type: 'varchar' })
  // idColor: string

  @ManyToOne(() => Account, (account) => account.id)
  user: Account

  @ManyToOne(() => Color, (color) => color.id)
  color: Color
  @ManyToOne(() => Icon, (icon) => icon.id)
  icon: Icon
}
