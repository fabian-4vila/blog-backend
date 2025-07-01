import { ORIGIN } from './config';

export const corsConfig = {
  origin: ORIGIN,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
};

export default corsConfig;
