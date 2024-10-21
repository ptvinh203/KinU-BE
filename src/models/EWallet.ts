import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Account } from './Account'

@Entity()
export class EWallet {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Account, (account) => account.id)
  user: Account // Liên kết với bảng Account

  @Column({ type: 'varchar' })
  phone: string

  @Column({ type: 'varchar' })
  pinCode: string

  @Column({ type: 'decimal' })
  balance: number // Sử dụng kiểu money
}
