import { ORIGIN } from './config';

export const corsConfig = {
  allowedHeaders: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credetials: true,
  origin: ORIGIN,
};

export default corsConfig;
