import { getRepository } from 'typeorm';
import { NewMovie } from '../controllers/movies';
import { Movie } from '../entities/Movie';

export async function getMovies() {
  const movieList = await getRepository(Movie).find();
  return movieList;
}

export function validateMovieData() {
  //
}

export async function postMovie(movieInfo: NewMovie) {
  const movie = getRepository(Movie).create(movieInfo);
  await getRepository(Movie).save(movie);
}

export async function findMovieById(id: number) {
  const movie = await getRepository(Movie).findOne(id);
  return movie;
}

export async function editMovie(id: number, movieInfo: NewMovie) {
  await getRepository(Movie).update(id, movieInfo);
  const updatedMovie = await getRepository(Movie).findOne(id);
  return updatedMovie;
}

export async function deleteMovie() {
  //
}
