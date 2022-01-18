import { getRepository } from 'typeorm';
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

export async function postMovie() {
//
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
