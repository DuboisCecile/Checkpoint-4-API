require('dotenv').config();

function getEnv(variable) {
  const value = process.env[variable];
  if (typeof value === 'undefined') {
    console.warn(`Seems like the variable "${variable}" is not set in the environment. 
    Did you forget to execute "cp .env.sample .env" and adjust variables in the .env file to match your own environment ?`);
  }
  return value;
}
const inProdEnv = getEnv('NODE_ENV') === 'production';
const inDevEnv = getEnv('NODE_ENV') === 'dev';
const inTestEnv = getEnv('NODE_ENV') === 'test';

const PORT = getEnv(`PORT${inTestEnv ? '_TEST' : ''}`);
const DATABASE_URL = getEnv(`DATABASE_URL`);
const API_BACK = getEnv(`API_BACK`);

const dbUrlregex =
  /* eslint-disable */
  /^(?:([^:\/?#\s]+):\/{2})?(?:([^@\/?#\s]+)@)?([^\/?#\s]+)?(?:\/([^?#\s]*))?(?:[?]([^#\s]+))?\S*$/;

const DB_USER = DATABASE_URL.match(dbUrlregex)[2].split(':')[0];
const DB_PASSWORD = DATABASE_URL.match(dbUrlregex)[2].split(':')[1];
const DB_HOST = DATABASE_URL.match(dbUrlregex)[3].split(':')[0];
const DB_PORT = DATABASE_URL.match(dbUrlregex)[3].split(':')[1];
const DB_NAME = DATABASE_URL.match(dbUrlregex)[4].split('/')[0];

const CORS_ALLOWED_ORIGINS = getEnv(`CORS_ALLOWED_ORIGINS`);

module.exports = {
  getEnv,
  inTestEnv,
  inProdEnv,
  inDevEnv,
  PORT,
  CORS_ALLOWED_ORIGINS,
  DATABASE_URL,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  API_BACK,
};
