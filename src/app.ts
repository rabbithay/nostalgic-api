import './config/setup';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import connectDatabase from './database/database';

import 'reflect-metadata';
import { serverMiddlewareError } from './error/serverMiddlewareErro';

import health from './routes/healthRoute';
import movie from './routes/movieRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use(health);
app.use(movie);

app.use(serverMiddlewareError);

export async function init() {
  await connectDatabase();
}

export default app;
