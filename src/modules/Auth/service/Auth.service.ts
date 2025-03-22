import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../../../entities/User.entity';
import { RolePermissions } from '../../../types/RolePermissions';
import { AppDataSource } from '../../../config/data.source';

const JWT_SECRET = process.env.JWT_SECRET || '';
const EXPIRES_IN = '1h';

if (!JWT_SECRET) {
  console.error('⚠️ WARNING: JWT_SECRET is not defined. Tokens cannot be generated.');
}

/**
 * Generates a JWT token for a given user.
 */
export const generateToken = (user: User): string | null => {
  if (!JWT_SECRET) return null;

  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      permissions: RolePermissions[user.role] || [],
    },
    JWT_SECRET,
    { expiresIn: EXPIRES_IN },
  );
};

/**
 * Compares a plain password with its hashed version.
 */
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
};

/**
 * Authenticates a user by email and password.
 */
export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      console.warn(`⚠️ Login attempt failed for email: ${email}`);
      return null;
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      console.warn(`⚠️ Invalid password attempt for email: ${email}`);
      return null;
    }
    return user;
  } catch (error) {
    console.error('⚠️ Error during authentication:', error);
    return null;
  }
};
