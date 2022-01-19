import { getRepository } from 'typeorm';
import { NewCustomer } from '../controllers/customers';
import { Customer } from '../entities/Customer';

export async function getCustomers() {
  const customerList = await getRepository(Customer).find();
  return customerList;
}

export function validateCustomerData() {
  //
}

export async function getCustomerByCpf() {
  //
}

export async function postCustomer(customerInfo: NewCustomer) {
  const customer = getRepository(Customer).create(customerInfo);
  await getRepository(Customer).save(customer);
}

export async function getCustomerById() {
//
}

export async function editCustomer(id: number, customerInfo: NewCustomer) {
  await getRepository(Customer).update(id, customerInfo);
  const updatedCustomer = await getRepository(Customer).findOne(id);
  return updatedCustomer;
}

export async function deleteCustomer(id: number) {
  await getRepository(Customer).delete(id);
}

export async function findCustomerById(id: number) {
  const customer = await getRepository(Customer).findOne(id);
  return customer;
}
