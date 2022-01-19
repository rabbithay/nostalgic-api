import { getRepository } from 'typeorm';
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

export async function postCustomer() {
//
}

export async function getCustomerById() {
//
}

export async function editCustomer() {
//
}

export async function deleteCustomer() {
//
}
