import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsUUID()
  postId!: string; // ID del post al que pertenece el comentario

  @IsNotEmpty()
  @IsUUID()
  userId!: string; // ID del usuario que realiza el comentario

  @IsNotEmpty()
  @IsString()
  text!: string; // Contenido del comentario
}
