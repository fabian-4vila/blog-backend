import { Request, Response, NextFunction } from 'express';
import { RoleType } from '../types/Role.type';
import { AuthenticatedUser } from '../interfaces/AuthUser';

export const authorizeRoles = (roles: RoleType[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as AuthenticatedUser | undefined;

    if (!user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    if (!roles.includes(user.role)) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    next();
  };
};
