import { IsNotEmpty, IsInt, Min, Max, IsBoolean, IsString } from 'class-validator';

export class CreatePostRatingDto {
  @IsNotEmpty()
  @IsString()
  postId!: string;

  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  stars?: number;

  @IsNotEmpty()
  @IsBoolean()
  likeDislike?: boolean;
}
