/* eslint-disable no-undef */
import 'jest';
import '../../src/config/setup';
import supertest from 'supertest';
import { getConnection } from 'typeorm';
import app, { init } from '../../src/app';
import { clearDatabase } from '../factories/clearDatabase';
import { createRental } from '../factories/createRental';
import { createCustomer } from '../factories/createCustomer';
import { createMovie } from '../factories/createMovie';

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
  returnDate?: string,
  movieId: number,
  customerId: number,
}

const mockNewCustomer = {
  name: 'Finn The Human',
  cpf: '91558203010',
  birthdate: '2001-12-18',
};

const mockNewMovie = {
  title: 'Piratas do caribe',
  parentalRating: '10',
  newRelease: false,
};

async function mockNewRental(body: Partial<RentalBody> = {}) {
  const movie = await createMovie(mockNewMovie);
  const customer = await createCustomer(mockNewCustomer);
  const mockNewRentalBody = {
    rentDate: body.rentDate || '2022-01-05',
    movieId: body.movieId || movie.id,
    customerId: body.customerId || customer.id,
    returnDate: body.returnDate || null,
  };
  const newRental = await createRental(mockNewRentalBody);
  return newRental;
}

describe('GET /rentals', () => {
  it('should answer with a array of rentals and status 200 in case of success', async () => {
    const rental = await mockNewRental();

    const response = await supertest(app).get('/rentals');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: rental.id,
          rentDate: rental.rentDate,
          movieId: rental.movieId,
          customerId: rental.customerId,
        }),
      ]),
    );
  });
});

describe('POST /rentals', () => {
  it('should answer with status 400 in case of invalid body', async () => {
    const {
      rentDate, returnDate, customerId,
    } = await mockNewRental();
    const rental = {
      rentDate, returnDate, movieId: 'invalid_id', customerId,
    };

    const response = await supertest(app).post('/rentals').send(rental);

    expect(response.status).toBe(400);
  });

  it('should answer with status 201 in case of success', async () => {
    const {
      rentDate, customerId, movieId,
    } = await mockNewRental();
    const rental = {
      rentDate, movieId, customerId,
    };

    const response = await supertest(app).post('/rentals').send(rental);

    expect(response.status).toBe(201);
  });
});

describe('PUT /rentals', () => {
  it('should answer with status 400 in case of invalid body', async () => {
    const rental = await mockNewRental();
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
    const rental = await mockNewRental();

    const response = await supertest(app).put(`/rentals/${id}`).send(rental);

    expect(response.status).toBe(400);
  });

  it('should answer with status 404 in case of rental dont exist', async () => {
    const id = 52;
    const rental = await mockNewRental();

    const response = await supertest(app).put(`/rentals/${id}`).send(rental);

    expect(response.status).toBe(404);
  });

  it('should answer with the updated rental objectand status 200 in case of success', async () => {
    const rental = await mockNewRental();
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
    const rental = await mockNewRental();
    const { id } = rental;

    const response = await supertest(app).delete(`/rentals/${id}`);

    expect(response.status).toBe(200);
  });
});
