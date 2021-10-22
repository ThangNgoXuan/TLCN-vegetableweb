import dotenv from 'dotenv';

dotenv.config();

export const env = {
  //MONGODB_URL_LOCAL: process.env.MONGODB_URL_LOCAL,
  MONGODB_URL_ONLINE: process.env.MONGO_URI2,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
};