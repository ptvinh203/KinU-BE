import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Account } from './Account';
import { TypeSprinding } from './TypeSprinding';

@Entity()
export class Expenditure {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ type: 'varchar' })
  name: string;

  @OneToOne(() => TypeSprinding, typeSprinding => typeSprinding.id)
  idTypeSpringding: TypeSprinding;

  @Column({ type: "decimal"}) 
  amount: number;

  @Column({ type: 'datetime' })
  dateSpinding: Date;

  @ManyToOne(() => Account, account => account.id)
  user: Account;

  @Column({ type: 'boolean' })
  paymentType: boolean;
}
