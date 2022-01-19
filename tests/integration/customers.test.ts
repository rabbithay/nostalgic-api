/* eslint-disable no-undef */
import 'jest';
import '../../src/config/setup';
import supertest from 'supertest';
import { getConnection } from 'typeorm';
import app, { init } from '../../src/app';
import { clearDatabase } from '../factories/clearDatabase';
import { createCustomer } from '../factories/createCustomer';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

export interface CustomerBody {
  name: string,
  cpf: string,
  birthdate: string,
}

const mockNewCustomer: CustomerBody = {
  name: 'Finn The Human',
  cpf: '91558203010',
  birthdate: '2001-12-18',
};

describe('GET /customers', () => {
  it('should answer with a array of customers and status 200 in case of success', async () => {
    const customer = await createCustomer(mockNewCustomer);

    const response = await supertest(app).get('/customers');

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: customer.name,
          cpf: customer.cpf,
          birthdate: customer.birthdate,
        }),
      ]),
    );
    expect(response.status).toBe(200);
  });
});

describe('POST /customers', () => {
  it('should answer with status 400 in case of invalid body', async () => {
    const { name, birthdate } = mockNewCustomer;
    const customer = {
      name, birthdate, cpf: '15478952',
    };

    const response = await supertest(app).post('/customers').send(customer);

    expect(response.status).toBe(400);
  });

  it('should answer with status 201 in case of success', async () => {
    const customer = mockNewCustomer;

    const response = await supertest(app).post('/customers').send(customer);

    expect(response.status).toBe(201);
  });
});

describe('PUT /movies', () => {
  it('should answer with status 400 in case of invalid body', async () => {
    const customer = await createCustomer(mockNewCustomer);
    const { birthdate, id } = customer;
    const updateCustomer = {
      name: 'Jake The Dog', birthdate, cpf: '14526879452',
    };

    const response = await supertest(app).put(`/customers/${id}`).send(updateCustomer);

    expect(response.status).toBe(400);
  });

  it('should answer with status 400 in case of invalid id', async () => {
    const id = 'id_invalido';

    const response = await supertest(app).put(`/customers/${id}`).send(mockNewCustomer);

    expect(response.status).toBe(400);
  });

  it('should answer with status 404 in case of customers dont exist', async () => {
    const id = 52;

    const response = await supertest(app).put(`/customers/${id}`).send(mockNewCustomer);

    expect(response.status).toBe(404);
  });

  it('should answer with the updated customers object and status 200 in case of success', async () => {
    const customer = await createCustomer(mockNewCustomer);
    const { birthdate, id, cpf } = customer;
    const updateCustomer = {
      name: 'Jake The Dog', birthdate, cpf,
    };

    const response = await supertest(app).put(`/customers/${id}`).send(updateCustomer);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id,
        name: updateCustomer.name,
        birthdate,
        cpf,
      }),
    );
  });
});

describe('DELETE /customers', () => {
  it('should answer with status 400 in case of invalid id', async () => {
    const id = 'id_invalido';

    const response = await supertest(app).delete(`/customers/${id}`);

    expect(response.status).toBe(400);
  });

  it('should answer with status 200 in case of success', async () => {
    const customer = await createCustomer(mockNewCustomer);
    const { id } = customer;

    const response = await supertest(app).delete(`/customers/${id}`);

    expect(response.status).toBe(200);
  });
});
