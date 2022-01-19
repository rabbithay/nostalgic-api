/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { newCustomerBodySchema } from '../schemas/newCustomerBodySchema';
import { validateObject } from '../services/validateObject';
import * as customerServices from '../services/customers';

export interface NewCustomer {
  name: string;
  birthdate: string,
  spf: string
}

export async function getCustomers(req: Request, res: Response) {
  const customers = await customerServices.getCustomers();
  return res.status(200).send(customers);
}

export async function postCustomer(req: Request, res: Response) {
  const customerInfo: NewCustomer = req.body;

  const isValidMovie = validateObject({
    object: customerInfo,
    schema: newCustomerBodySchema,
  });
  if (!isValidMovie) return res.sendStatus(400);

  await customerServices.postCustomer(customerInfo);
  return res.sendStatus(201);
}

export async function editCustomer(req: Request, res: Response) {
  //
}

export async function deleteCustomer(req: Request, res: Response) {
  //
}
