import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    title: string;

  @Column()
    parentalRating: string;

  @Column()
    newRelease: boolean;
}
