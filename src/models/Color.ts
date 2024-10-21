import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ type: 'varchar' })
  name: string
}
