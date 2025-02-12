import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { RoleType } from '../types/Role.type';
import { AuthenticatedUser } from '../interfaces/AuthUser';

export const authenticateJWT = passport.authenticate('jwt', { session: false });

export const authorizeRoles = (roles: RoleType[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as AuthenticatedUser | undefined;

    if (!user) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    return next();
  };
};

export const authorizePermissions = (permissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as AuthenticatedUser | undefined;

    if (!user) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    const userPermissions = user.permissions || [];
    const hasPermission = permissions.every((perm) => userPermissions.includes(perm));

    if (!hasPermission) {
      return res.status(403).json({ message: 'No tienes permiso para esta acción' });
    }

    return next();
  };
};
