import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from './Account';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar"})
  content: string;

  @ManyToOne(() => Account, account => account.username)
  user: Account; 

  @Column({type: "varchar"})
  typeNotifiction: string;
}
