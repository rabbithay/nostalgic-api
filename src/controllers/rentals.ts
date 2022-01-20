/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { newRentalBodySchema } from '../schemas/newRentalBodySchema';
import { validateObject } from '../services/validateObject';
import * as rentalServices from '../services/rentals';
import { positiveIntegerSchema } from '../schemas/positiveIntegerSchema';

export interface NewRental {
  rentDate: string,
  returnDate: string,
  movieId: number,
  customerId: number,
}

export async function getRentals(req: Request, res: Response) {
  const rentals = await rentalServices.getRentals();
  return res.status(200).send(rentals);
}

export async function postRental(req: Request, res: Response) {
  const rentalInfo: NewRental = req.body;

  const isValidRental = validateObject({
    object: rentalInfo,
    schema: newRentalBodySchema,
  });
  if (!isValidRental) return res.sendStatus(400);

  await rentalServices.postRental(rentalInfo);
  return res.sendStatus(201);
}

export async function editRental(req: Request, res: Response) {
  const { id } = req.params;
  const isValidId = validateObject({
    object: { number: id },
    schema: positiveIntegerSchema,
  });
  if (!isValidId) return res.sendStatus(400);

  const rentalInfo: NewRental = req.body;
  const isValidRental = validateObject({
    object: rentalInfo,
    schema: newRentalBodySchema,
  });
  if (!isValidRental) return res.sendStatus(400);

  const rentalToBeEdited = await rentalServices.findRentalById(Number(id));
  if (!rentalToBeEdited) return res.sendStatus(404);

  const updatedRental = await rentalServices.editRental(Number(id), rentalInfo);
  return res.status(200).send(updatedRental);
}

export async function deleteRental(req: Request, res: Response) {
  const { id } = req.params;
  const isValidId = validateObject({
    object: { number: id },
    schema: positiveIntegerSchema,
  });
  if (!isValidId) return res.sendStatus(400);

  await rentalServices.deleteRental(Number(id));
  return res.sendStatus(200);
}
