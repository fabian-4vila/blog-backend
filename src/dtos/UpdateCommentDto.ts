// src/modules/comment/dto/updateComment.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  text!: string;
}
