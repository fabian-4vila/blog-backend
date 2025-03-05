import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/data.source';
import { PostRating } from '../entities/PostRating.entity';
import { AuthenticatedUser } from '../interfaces/AuthUser';
import { RoleType } from '../types/Role.type';
import { HttpResponse } from '../shared/http.response';

const httpResponse = new HttpResponse();

export const authorizeRatingAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as AuthenticatedUser | undefined;
    const ratingId = req.params.id;

    if (!user) {
      httpResponse.Unauthorized(res, { message: 'Not authenticated' });
      return;
    }

    const ratingRepository = AppDataSource.getRepository(PostRating);
    const rating = await ratingRepository.findOne({ where: { id: ratingId }, relations: ['user'] });

    if (!rating) {
      httpResponse.NotFound(res, { message: 'Rating not found' });
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
