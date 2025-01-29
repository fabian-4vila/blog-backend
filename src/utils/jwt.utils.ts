import { UserPayLoad } from '../interfaces/PayLoad.interface';
import jwt from 'jsonwebtoken';
import { logger } from './logger';

export function generateToken(user: UserPayLoad): string {
  const payload = {
    id: user.id,
    role: user.role,
  };
  logger.info(`Generando token para el usuario con ID: ${user.id}`, `JWT_SECRET:`, process.env.JWT_SECRET);
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}
console.log('JWT_SECRET:', process.env.JWT_SECRET);
