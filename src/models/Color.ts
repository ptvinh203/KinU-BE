import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar' })
  colorCode: string
}
