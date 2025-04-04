import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { AppDataSource } from './data.source';

config();

const env = process.env.NODE_ENV || 'production';

config({ path: `.env.${env}.local` });

export const {
  NODE_ENV,
  PORT,
  LOG_DIR,
  LOG_FORMAT,
  API_VERSION,
  ORIGIN,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  JWT_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  BREVO_API_KEY,
} = process.env;

export abstract class ConfigServer {
  get initConnect(): Promise<DataSource> {
    return AppDataSource.initialize();
  }
}
