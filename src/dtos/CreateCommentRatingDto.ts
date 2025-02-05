import { IsNotEmpty, IsInt, Min, Max, IsBoolean } from 'class-validator';

export class CreateCommentRatingDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  stars?: number; // Calificación entre 1 y 5

  @IsNotEmpty()
  @IsBoolean()
  likeDislike?: boolean; // Indica si es "me gusta" o "no me gusta"
}
