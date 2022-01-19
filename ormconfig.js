require('dotenv').config();

const rootDir = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

module.exports = {
  type: "postgres",
  name: 'default',
  url: process.env.DATABASE_URL,
  migrationsTableName: "migrations",
  migrations: ["dist/migrations/*.js"],
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "dist/entities/*.js"
  },
  entities: [`${rootDir}/entities/*.{ts,js}`]
};