import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'The name is required' })
  name!: string;

  @IsEmail({}, { message: 'The email is not valid' })
  email!: string;

  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password!: string;
}
