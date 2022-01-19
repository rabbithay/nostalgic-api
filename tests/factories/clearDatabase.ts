import { getRepository } from 'typeorm';
import { Movie } from '../../src/entities/Movie';

export async function clearDatabase() {
  await getRepository(Movie).delete({});
}
