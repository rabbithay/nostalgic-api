import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    name: string;

  @Column()
    cpf: string;

  @Column({ type: 'date' })
    birthdate: string;
}
