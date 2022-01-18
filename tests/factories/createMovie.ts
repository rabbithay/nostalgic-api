import { getRepository } from 'typeorm';
import { Movie } from '../../src/entities/Movie';
import { MovieBody } from '../integration/movies.test';

export async function createMovie(mockNewMovie: MovieBody) {
  const movie = getRepository(Movie).create(mockNewMovie);

  const response = await getRepository(Movie).save(movie);

  return response;
}
