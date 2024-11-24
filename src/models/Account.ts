import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Notification } from './Notification'
import { EWallet } from './EWallet'

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', unique: true })
  username: string

  @Column({ type: 'varchar' })
  password: string

  @Column({ type: 'varchar' })
  email: string

  @Column({ type: 'varchar' })
  fullname: string

  @Column({ type: 'varchar' })
  phone: string

  @Column({ type: 'datetime' })
  birthday: Date

  @Column({ type: 'int' })
  gender: number

  @Column({ type: 'bigint' })
  currentBalance: number

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => EWallet, (ewallet) => ewallet.user)
  wallets: EWallet[];
}
