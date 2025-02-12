import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { RoleType } from '../types/Role.type';
import { AuthenticatedUser } from '../interfaces/AuthUser';

export const authenticateJWT = passport.authenticate('jwt', { session: false });

export const authorizeRoles = (roles: RoleType[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as AuthenticatedUser | undefined;

    if (!user) {
      res.status(401).json({ message: 'No autenticado' });
      return;
    }

    if (!roles.includes(user.role)) {
      res.status(403).json({ message: 'Acceso denegado' });
      return;
    }

    return next();
  };
};

export const authorizePermissions = (permissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as AuthenticatedUser | undefined;

    if (!user) {
      res.status(401).json({ message: 'No autenticado' });
      return;
    }

    const userPermissions = user.permissions || [];
    const hasPermission = permissions.every((perm) => userPermissions.includes(perm));

    if (!hasPermission) {
      res.status(403).json({ message: 'No tienes permiso para esta acción' });
      return;
    }

    return next();
  };
};

// **authorizeOwner ahora está fuera de authorizePermissions**
export const authorizeOwner = (getResource: (id: string) => Promise<{ ownerId: string } | null>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as AuthenticatedUser | undefined;
    const { id } = req.params;

    if (!user) {
      res.status(401).json({ message: 'No autenticado' });
      return;
    }

    const resource = await getResource(id);

    if (!resource) {
      res.status(404).json({ message: 'Recurso no encontrado' });
      return;
    }

    if (resource.ownerId !== user.id && user.role !== RoleType.ADMIN) {
      res.status(403).json({ message: 'No tienes permiso para modificar este recurso' });
      return;
    }

    return next();
  };
};
