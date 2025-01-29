import { JWT_SECRET } from '../config/config';
import { UserPayLoad } from '../interfaces/PayLoad.interface';
import * as jwt from 'jsonwebtoken';

export function generateToken(user: UserPayLoad): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET no está definido');
  }

  const payload = {
    id: user.id,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}
