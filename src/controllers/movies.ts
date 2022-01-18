/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { newMovieBodySchema } from '../schemas/newMovieBodySchema';
import { validateObject } from '../services/utils';
import * as movieServices from '../services/movies';

export interface NewMovie {
  title: string;
  parentalRating: string;
  newRelease: boolean;
}

export async function getMovies(req: Request, res: Response) {
  const movies = await movieServices.getMovies();
  return res.status(200).send(movies);
}

export async function postMovie(req: Request, res: Response) {
  const movieInfo: NewMovie = req.body;

  const isValidMovie = validateObject({
    object: movieInfo,
    schema: newMovieBodySchema,
  });
  if (!isValidMovie) return res.sendStatus(400);

  await movieServices.postMovie(movieInfo);
  return res.sendStatus(201);
}

export async function editMovie(req: Request, res: Response) {
  //
}

export async function deleteMovie(req: Request, res: Response) {
  //
}
