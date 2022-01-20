import { getRepository } from 'typeorm';
import { Rental } from '../../src/entities/Rental';
import { RentalBody } from '../integration/rentals.test';

export async function createRental(mockNewRental: RentalBody) {
  const rental = getRepository(Rental).create(mockNewRental);

  const response = await getRepository(Rental).save(rental);

  return response;
}
