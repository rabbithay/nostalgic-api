import { getRepository } from 'typeorm';
import { Customer } from '../../src/entities/Customer';
import { Movie } from '../../src/entities/Movie';
import { Rental } from '../../src/entities/Rental';

export async function clearDatabase() {
  await getRepository(Rental).delete({});
  await getRepository(Movie).delete({});
  await getRepository(Customer).delete({});
}
