import { getRepository } from 'typeorm';
import { Customer } from '../../src/entities/Customer';
import { CustomerBody } from '../integration/customers.test';

export async function createCustomer(mockNewCustomer: CustomerBody) {
  const customer = getRepository(Customer).create(mockNewCustomer);

  const response = await getRepository(Customer).save(customer);

  return response;
}
