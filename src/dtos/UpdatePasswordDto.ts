import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @MinLength(8, { message: 'the password must have at least 8 characteres  ' })
  Password!: string;
}
