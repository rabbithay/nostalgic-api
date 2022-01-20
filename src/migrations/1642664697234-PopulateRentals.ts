import {MigrationInterface, QueryRunner} from "typeorm";

const rentals = [
    {
      clientId: 3,
      movieId: 6,
      rentDate: '2021-11-01',
      returnDate: '2021-11-03',
    },
    {
      clientId: 4,
      movieId: 5,
      rentDate: '2021-11-04',
      returnDate: null,
    },
    {
      clientId: 8,
      movieId: 8,
      rentDate: '2021-11-05',
      returnDate: '2021-11-07',
    },
    {
      clientId: 1,
      movieId: 10,
      rentDate: '2021-11-05',
      returnDate: null,
    },
    {
      clientId: 5,
      movieId: 4,
      rentDate: '2021-11-10',
      returnDate: '2021-11-12',
    },
    {
      clientId: 2,
      movieId: 6,
      rentDate: '2021-11-15',
      returnDate: '2021-11-17',
    },
    {
      clientId: 3,
      movieId: 7,
      rentDate: '2021-11-15',
      returnDate: '2021-11-17',
    },
    {
      clientId: 9,
      movieId: 8,
      rentDate: '2021-11-18',
      returnDate: '2021-11-20',
    },
    {
      clientId: 3,
      movieId: 9,
      rentDate: '2021-12-04',
      returnDate: '2021-12-06',
    },
    {
      clientId: 1,
      movieId: 8,
      rentDate: '2021-12-05',
      returnDate: null,
    },
  
  ];

export class PopulateRentals1642664697234 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        rentals.forEach( async (rental)=>{                
            await queryRunner.query(`
                INSERT INTO rentals 
                ("customerId", "movieId", "rentDate", "returnDate")
                VALUES
                ($1, $2, $3, $4)
            `, [rental.clientId, rental.movieId, rental.rentDate, rental.returnDate]);
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM rentals
        `)
    }
}
