import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Account } from './Account'
import { Color } from './Color'
import { Icon } from './Icon'
import { IsNotEmpty } from 'class-validator'

@Entity()
export class TypeSprinding {
  @PrimaryGeneratedColumn()
  id: number 

  @Column({ type: 'varchar'})
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string

  @Column({ type: 'decimal', precision: 10, scale: 2 }) 
  estimatedAmount: number

  @Column({ type: 'varchar' })
  abbreviation: string

  @ManyToOne(() => Account, (account) => account.id)
  user: Account

  @ManyToOne(() => Color, (color) => color.id)
  color: Color
  @ManyToOne(() => Icon, (icon) => icon.id)
  icon: Icon
}
