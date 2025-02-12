import { RoleType } from '../types/Role.type';

export interface AuthenticatedUser {
  id: string;
  role: RoleType;
  permissions: string[];
}
