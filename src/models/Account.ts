import { Entity, PrimaryGeneratedColumn, Column,OneToMany  } from 'typeorm'
import { Notification } from './Notification'

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

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
