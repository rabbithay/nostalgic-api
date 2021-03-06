import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';
import { Customer } from './Customer';
import { Movie } from './Movie';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ type: 'date' })
    rentDate: string;

  @Column({ type: 'date', nullable: true })
    returnDate!: string;

  @Column()
    movieId: number;

  @Column()
    customerId!:number;

  @ManyToOne(() => Movie, (movie: Movie) => movie.id)
    movie: Movie;

  @ManyToOne(() => Customer, (customer) => customer.id)
    customer: Customer;
}
