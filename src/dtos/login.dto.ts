import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email is mandatory' })
  email!: string;

  @IsNotEmpty({ message: 'The password is mandatory' })
  @MinLength(8, { message: 'The password must have at least 8 characters ' })
  password!: string;
}
