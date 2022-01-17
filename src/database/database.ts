import dotenv from 'dotenv';
import { getConnectionManager } from "typeorm";

dotenv.config();

export default async function connect () {
  const connectionManager = await getConnectionManager();
  const connection = connectionManager.create({
    name: process.env.ORM_NAME,
    type: process.env.ORM_TYPE,
    url: process.env.ORM_URL,
    entities: ["src/entities/*.ts"]
  });
  await connection.connect();
  return connection;
}