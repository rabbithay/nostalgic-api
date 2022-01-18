import { getConnectionManager } from "typeorm";

const rootDir = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

export default async function connect () {
  const connectionManager = await getConnectionManager();
  const connection = connectionManager.create({
    name: "default",
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [`${rootDir}/entities/*.{ts,js}`]
  });
  await connection.connect();
  return connection;
}