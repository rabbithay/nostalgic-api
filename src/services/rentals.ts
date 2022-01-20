import { getRepository } from 'typeorm';
import { NewRental } from '../controllers/rentals';
import { Rental } from '../entities/Rental';

export async function getRentals() {
  const rentalList = await getRepository(Rental).find();
  return rentalList;
}

export async function postRental(rentalInfo: NewRental) {
  const rental = getRepository(Rental).create(rentalInfo);
  await getRepository(Rental).save(rental);
}

export async function findRentalById(id: number) {
  const rental = await getRepository(Rental).findOne(id);
  return rental;
}

export async function editRental(id: number, rentalInfo: NewRental) {
  await getRepository(Rental).update(id, rentalInfo);
  const updatedRental = await getRepository(Rental).findOne(id);
  return updatedRental;
}

export async function deleteRental(id: number) {
  await getRepository(Rental).delete(id);
}
