import { Request, Response, NextFunction } from 'express';
import { RoleType } from '../types/Role.type';
import { AuthenticatedUser } from '../interfaces/AuthUser';

export const authorizeOwner = (getResource: (id: string) => Promise<{ ownerId: string } | null>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as AuthenticatedUser | undefined;
    const { id } = req.params;

    if (!user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const resource = await getResource(id);

    if (!resource) {
      res.status(404).json({ message: 'Resource not found' });
      return;
    }

    if (resource.ownerId !== user.id && user.role !== RoleType.ADMIN) {
      res.status(403).json({ message: 'You do not have permission to modify this resource' });
      return;
    }

    next();
  };
};

export const authorizeOwnerOrRoles = (
  roles: RoleType[],
  getResource: (id: string) => Promise<{ ownerId: string } | null>,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as AuthenticatedUser | undefined;
    const { id } = req.params;

    if (!user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    if (roles.includes(user.role)) {
      return next();
    }

    const resource = await getResource(id);
    if (!resource) {
      res.status(404).json({ message: 'Resource not found' });
      return;
    }

    if (resource.ownerId !== user.id) {
      res.status(403).json({ message: 'You do not have permission to modify this resource' });
      return;
    }

    next();
  };
};
