import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from './Account';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar"})
  content: string;

  @ManyToOne(() => Account, account => account.username)
  userId: string; // Liên kết với bảng Account

  @Column({type: "varchar"})
  typeNotifiction: string;
}
