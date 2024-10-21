import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

@Entity()
export class Icon {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ type: 'varchar' })
  name: string
  @Column({ type: 'varchar' })
  svgUrl: string
}
