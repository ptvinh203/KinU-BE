import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne
} from 'typeorm'
import { Account } from './Account'
import { TypeSprinding } from './TypeSprinding'

@Entity()
export class Expenditure {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar'})
  name: string

  @ManyToOne(() => TypeSprinding, (typeSprinding) => typeSprinding.id)
  typeSprinding: TypeSprinding

  @Column({ type: 'decimal', precision: 15, scale: 2 }) 
  amount: number

  @Column({ type: 'datetime' })
  dateSpinding: Date

  @ManyToOne(() => Account, (account) => account.id)
  user: Account

  @Column({ type: 'boolean' })
  paymentType: boolean
}
