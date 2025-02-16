import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../../../entities/User.entity';
import { RolePermissions } from '../../../types/RolePermissions';
import { AppDataSource } from '../../../config/data.source';

const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = '1h';

if (!JWT_SECRET) {
  throw new Error('FATAL ERROR: Error in the server configuration');
}

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
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    return false;
  }
};

export const authenticateUser = async (email: string, password: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Incorrect password');
  }
  return generateToken(user);
};
