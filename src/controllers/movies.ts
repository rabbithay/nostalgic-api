/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import * as movieServices from '../services/movies';

export async function getMovies(req: Request, res: Response) {
  const movies = await movieServices.getMovies();
  return res.status(200).send(movies);
}

export async function postMovie(req: Request, res: Response) {
  //
}

export async function editMovie(req: Request, res: Response) {
  //
}

export async function deleteMovie(req: Request, res: Response) {
  //
}
