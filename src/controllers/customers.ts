/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
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
  //
}

export async function editCustomer(req: Request, res: Response) {
  //
}

export async function deleteCustomer(req: Request, res: Response) {
  //
}
