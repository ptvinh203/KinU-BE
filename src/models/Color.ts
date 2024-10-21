import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ type: 'varchar' })
  name: string
}
