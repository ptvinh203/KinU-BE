import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Icon {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ type: 'varchar' })
  name: string
  @Column({ type: 'varchar' })
  svgUrl: string
}
