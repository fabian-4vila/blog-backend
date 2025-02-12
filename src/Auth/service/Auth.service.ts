import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../../entities/User.entity';
import { RolePermissions } from '../../types/RolePermissions';

const JWT_SECRET = process.env.JWT_SECRET || 'secreto';
const EXPIRES_IN = '1h';

export const generateToken = (user: User) => {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    permissions: RolePermissions[user.role] || [],
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
};

export const verifyPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
