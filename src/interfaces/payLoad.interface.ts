import { RoleType } from '../types/Role.type';

export interface UserPayLoadToken {
  sub: string;
  email: string;
  role: RoleType;
  permissions: string[];
  iat?: number;
  exp?: number;
}
