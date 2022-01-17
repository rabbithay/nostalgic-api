import '../config/setup';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routers/useRouter';
import { serverMiddlewareError } from './error/serverMiddlewareErro';
import "reflect-metadata";
import connectDatabase from "./database/database";


const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

app.use(serverMiddlewareError);


export async function init () {
    await connectDatabase();
  }
  

export default app;
