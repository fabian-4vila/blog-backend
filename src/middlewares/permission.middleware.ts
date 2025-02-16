import { Request, Response, NextFunction } from 'express';
import { AuthenticatedUser } from '../interfaces/AuthUser';

export const authorizePermissions = (permissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as AuthenticatedUser | undefined;

    if (!user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const userPermissions = user.permissions || [];
    const hasPermission = permissions.every((perm) => userPermissions.includes(perm));

    if (!hasPermission) {
      res.status(403).json({ message: 'You have no permission for this action' });
      return;
    }

    next();
  };
};
