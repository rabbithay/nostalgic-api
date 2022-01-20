/* eslint-disable no-unused-vars */
import {
  Request, Response, NextFunction,
} from 'express';

export async function serverMiddlewareError(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  console.log('Middleware de erro: ', error);
  return response.sendStatus(500);
}
