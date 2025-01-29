import { RoleType } from '../../types/Role.type';
import { AuthService } from '../service/authService';
import { Request, Response } from 'express';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  try {
    const user = await authService.register(email, password, role as RoleType);
    res.status(201).json({ message: 'Usuario creado', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario ', error });
  } //quitar el error  por seguridad en produccion
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    if (!token) {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    res.json({ message: 'inicio de seccion exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  } //quitar el error  por seguridad en produccion
};
