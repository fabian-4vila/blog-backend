import { Request, Response, NextFunction } from 'express';
import { RoleType } from '../types/Role.type';
import { AuthenticatedUser } from '../interfaces/AuthUser';
import { HttpResponse } from '../shared/http.response';

const httpResponse = new HttpResponse();

export const authorizeRoles = (roles: RoleType[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as AuthenticatedUser | undefined;

    if (!user) {
      httpResponse.Unauthorized(res, { message: 'Not authenticated' });
      return;
    }

    if (!roles.includes(user.role)) {
      httpResponse.Forbidden(res, { message: 'Access denied' });
      return;
    }

    next();
  };
};
