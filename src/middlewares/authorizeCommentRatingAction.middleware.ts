import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/data.source';
import { CommentRating } from '../entities/CommentRating.entity';
import { AuthenticatedUser } from '../interfaces/AuthUser';
import { RoleType } from '../types/Role.type';
import { HttpResponse } from '../shared/http.response';

const httpResponse = new HttpResponse();

export const authorizeCommentRatingAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as AuthenticatedUser | undefined;
    const ratingId = req.params.id;

    if (!user) {
      httpResponse.Unauthorized(res, { message: 'Not authenticated' });
      return;
    }

    const ratingRepository = AppDataSource.getRepository(CommentRating);
    const rating = await ratingRepository.findOne({ where: { id: ratingId }, relations: ['user'] });

    if (!rating) {
      httpResponse.NotFound(res, { message: 'Comment rating not found' });
      return;
    }

    if (rating.user.id !== user.id && user.role !== RoleType.ADMIN) {
      httpResponse.Forbidden(res, { message: 'Access denied' });
      return;
    }

    next();
  } catch (error) {
    httpResponse.Error(res, { message: 'Internal Server Error' });
  }
};
