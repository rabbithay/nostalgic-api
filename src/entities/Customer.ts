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

    constructor(name: string, cpf: string, birthdate: string) {
      this.name = name;
      this.cpf = cpf;
      this.birthdate = birthdate;
    }
}
