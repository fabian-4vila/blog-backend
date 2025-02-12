import { Request, Response } from 'express';
import { AppDataSource } from '../../config/data.source';
import { User } from '../../entities/User.entity';
import { generateToken, verifyPassword } from '../service/Auth.service';

const userRepository = AppDataSource.getRepository(User);

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findOne({ where: { email } });

    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = generateToken(user);
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};
