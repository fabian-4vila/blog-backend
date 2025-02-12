import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../../entities/User.entity';
import { RolePermissions } from '../../types/RolePermissions';
import { AppDataSource } from '../../config/data.source';

const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = '1h';

if (!JWT_SECRET) {
  throw new Error('FATAL ERROR: JWT_SECRET no está definido en las variables de entorno.');
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
  console.log('🛠️ Verificando contraseña...');
  console.log('🔑 Contraseña ingresada:', password);
  console.log('🗄️ Hash almacenado en la BD:', hash);

  try {
    const isMatch = await bcrypt.compare(password, hash);
    console.log('🔍 ¿Las contraseñas coinciden?', isMatch);
    return isMatch;
  } catch (error) {
    console.error(' Error comparando contraseñas:', error);
    return false;
  }
};

export const authenticateUser = async (email: string, password: string) => {
  console.log('📩 Iniciando autenticación para:', email);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    console.error('❌ Usuario no encontrado');
    throw new Error('Usuario no encontrado');
  }

  console.log('✅ Usuario encontrado:', user);
  console.log('🔑 Contraseña almacenada en BD:', user.password);

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    console.error('❌ Contraseña incorrecta');
    throw new Error('Contraseña incorrecta');
  }

  console.log('🔐 Generando token JWT...');
  return generateToken(user);
};
