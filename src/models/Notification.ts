import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Account } from './Account';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar'})
  content: string;

  @Column({ type: 'varchar' })
  typeNotifiction: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({type: 'boolean'})
  read: boolean

  @ManyToOne(() => Account, (account) => account.notifications)
  user: Account;
}
