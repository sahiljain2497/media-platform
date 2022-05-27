import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  DB_URI,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  FRONTEND_RESET_PASSWORD_DOMAIN,
  FRONTEND_DOMAIN,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  AWS_EMAIL,
} = process.env;
