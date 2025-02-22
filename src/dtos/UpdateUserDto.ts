import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { RoleType } from '../types/Role.type';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'The name is required' })
  name!: string;

  @IsEmail({}, { message: 'The email is not valid' })
  email!: string;

  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password!: string;

  @IsOptional()
  @IsEnum(RoleType, { message: 'The role is invalid' })
  role?: RoleType;
}
