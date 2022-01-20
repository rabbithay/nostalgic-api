/* eslint-disable no-undef */
import 'jest';
import '../../src/config/setup';
import supertest from 'supertest';
import { getConnection } from 'typeorm';
import app, { init } from '../../src/app';
import { clearDatabase } from '../factories/clearDatabase';
import { createRental } from '../factories/createRental';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

export interface RentalBody {
  rentDate: string,
  returnDate: string,
  movieId: number,
  customerId: number,
}

const mockNewRental: RentalBody = {
  rentDate: '2022-01-05',
  returnDate: '',
  movieId: 1,
  customerId: 3,
};

describe('GET /rentals', () => {
  it('should answer with a array of rentals and status 200 in case of success', async () => {
    const rental = await createRental(mockNewRental);

    const response = await supertest(app).get('/rentals');

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: rental.id,
          rentDate: rental.rentDate,
          returnDate: rental.returnDate,
          movie: rental.movie,
          customer: rental.customer,
        }),
      ]),
    );
    expect(response.status).toBe(200);
  });
});

describe('POST /rentals', () => {
  it('should answer with status 400 in case of invalid body', async () => {
    const {
      rentDate, returnDate, customerId,
    } = mockNewRental;
    const rental = {
      rentDate, returnDate, movieId: 'invalid_id', customerId,
    };

    const response = await supertest(app).post('/rentals').send(rental);

    expect(response.status).toBe(400);
  });

  it('should answer with status 201 in case of success', async () => {
    const rental = mockNewRental;

    const response = await supertest(app).post('/rentals').send(rental);

    expect(response.status).toBe(201);
  });
});

describe('PUT /rentals', () => {
  it('should answer with status 400 in case of invalid body', async () => {
    const rental = await createRental(mockNewRental);
    const {
      id, rentDate, customer,
    } = rental;
    const updateRental = {
      rentDate, returnDate: '2022-01-10', movieId: 'invalid_id', customerId: customer.id,
    };

    const response = await supertest(app).put(`/rentals/${id}`).send(updateRental);

    expect(response.status).toBe(400);
  });

  it('should answer with status 400 in case of invalid id', async () => {
    const id = 'id_invalido';

    const response = await supertest(app).put(`/rentals/${id}`).send(mockNewRental);

    expect(response.status).toBe(400);
  });

  it('should answer with status 404 in case of rental dont exist', async () => {
    const id = 52;

    const response = await supertest(app).put(`/rentals/${id}`).send(mockNewRental);

    expect(response.status).toBe(404);
  });

  it('should answer with the updated rental object and status 200 in case of success', async () => {
    const rental = await createRental(mockNewRental);
    const {
      id, rentDate, movie, customer,
    } = rental;
    const updateRental = {
      rentDate, returnDate: '2022-01-10', movieId: movie.id, customerId: customer.id,
    };

    const response = await supertest(app).put(`/rentals/${id}`).send(updateRental);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id, rentDate, returnDate: updateRental.returnDate, movie, customer,
      }),
    );
  });
});

describe('DELETE /rentals', () => {
  it('should answer with status 400 in case of invalid id', async () => {
    const id = 'id_invalido';

    const response = await supertest(app).delete(`/rentals/${id}`);

    expect(response.status).toBe(400);
  });

  it('should answer with status 200 in case of success', async () => {
    const rental = await createRental(mockNewRental);
    const { id } = rental;

    const response = await supertest(app).delete(`/rentals/${id}`);

    expect(response.status).toBe(200);
  });
});
