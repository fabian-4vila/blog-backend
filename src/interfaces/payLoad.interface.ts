import { RoleType } from '../types/Role.type';

export interface UserPayLoadToken {
  sub: string;
  role: RoleType;
}
