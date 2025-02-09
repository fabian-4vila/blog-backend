import { Request, Response, NextFunction } from 'express';
import { UserPayLoadToken } from '../interfaces/payLoad.interface';
import { RoleType } from '../types/Role.type';

/**
 * Middleware para validar los permisos según el rol del usuario.
 * @param allowedRoles - Roles permitidos para acceder a la ruta.
 */
export function authorizeRoles(...allowedRoles: RoleType[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as UserPayLoadToken;

    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      res.status(403).json({ message: 'You have no permissions to access this route' });
      return;
    }

    next();
  };
}
