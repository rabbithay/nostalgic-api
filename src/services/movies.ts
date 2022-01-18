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

export async function checkMovieExist() {
//
}

export async function postMovie(movieInfo: NewMovie) {
  const movie = getRepository(Movie).create(movieInfo);
  await getRepository(Movie).save(movie);
}

export async function getMovieById() {
//
}

export async function editMovie() {
//
}

export async function deleteMovie() {
  //
}
