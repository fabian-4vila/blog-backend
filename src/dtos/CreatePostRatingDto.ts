import { IsNotEmpty, IsInt, Min, Max, IsBoolean, IsString } from 'class-validator';

export class CreatePostRatingDto {
  @IsNotEmpty()
  @IsString()
  postId!: string; // ID del post que se califica

  @IsNotEmpty()
  @IsString()
  userId!: string; // ID del usuario que califica

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  stars?: number; // Calificación entre 1 y 5

  @IsNotEmpty()
  @IsBoolean()
  likeDislike?: boolean; // Indica si es "me gusta" o "no me gusta"
}
