/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { newCustomerBodySchema } from '../schemas/newCustomerBodySchema';
import { validateObject } from '../services/validateObject';
import * as customerServices from '../services/customers';
import { positiveIntegerSchema } from '../schemas/positiveIntegerSchema';

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
  const { id } = req.params;
  const isValidId = validateObject({
    object: { number: id },
    schema: positiveIntegerSchema,
  });
  if (!isValidId) return res.sendStatus(400);

  const customerInfo: NewCustomer = req.body;
  const isValidCustomer = validateObject({
    object: customerInfo,
    schema: newCustomerBodySchema,
  });
  if (!isValidCustomer) return res.sendStatus(400);

  const customerToBeEdited = await customerServices.findCustomerById(Number(id));
  if (!customerToBeEdited) return res.sendStatus(404);

  const updateCustomer = await customerServices.editCustomer(Number(id), customerInfo);
  return res.status(200).send(updateCustomer);
}

export async function deleteCustomer(req: Request, res: Response) {
  const { id } = req.params;
  const isValidId = validateObject({
    object: { number: id },
    schema: positiveIntegerSchema,
  });
  if (!isValidId) return res.sendStatus(400);

  await customerServices.deleteCustomer(Number(id));
  return res.sendStatus(200);
}
