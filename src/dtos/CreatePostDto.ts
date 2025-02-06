// src/dto/CreatePostDto.ts
import { IsNotEmpty, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class FileDto {
  @IsNotEmpty()
  @IsString()
  type!: string; // Tipo de archivo (ej. imagen, PDF, etc.)

  @IsNotEmpty()
  @IsString()
  url!: string; // URL del archivo
}

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title!: string; // Título del posteo

  @IsNotEmpty()
  @IsString()
  content!: string; // Contenido del posteo

  @IsNotEmpty()
  @IsString()
  userId!: string; // ID del usuario que crea el post

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileDto)
  files?: FileDto[]; // Archivos asociados al posteo (opcional)
}
