import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'The email is not valid' })
  email!: string;
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password!: string;
}
