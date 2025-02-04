import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'The email is not valid' })
  email!: string;
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password!: string;
}
