import dotEnv from 'dotenv';

dotEnv.config();

export default {
  dev: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.USER_PASSWORD,
    port: process.env.DB_PORT
  },
  test: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.USER_PASSWORD,
    port: process.env.DB_PORT
  },
  production: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.USER_PASSWORD,
    port: process.env.DB_PORT
  }
};
