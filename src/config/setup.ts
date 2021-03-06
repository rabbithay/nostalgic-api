import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
} else {
  dotenv.config();
}
