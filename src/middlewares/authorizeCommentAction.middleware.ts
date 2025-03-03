import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/data.source'; // Asegúrate de que esta ruta sea correcta
import { Comment } from '../entities/Comment.entity';
import { AuthenticatedUser } from '../interfaces/AuthUser';
import { RoleType } from '../types/Role.type';
import { HttpResponse } from '../shared/http.response';

const httpResponse = new HttpResponse();
export const authorizeCommentAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as AuthenticatedUser | undefined;
    const commentId = req.params.id;

    if (!user) {
      httpResponse.Unauthorized(res, { message: 'Not authenticated' });
      return;
    }

    const commentRepository = AppDataSource.getRepository(Comment);
    const comment = await commentRepository.findOne({ where: { id: commentId }, relations: ['user'] });

    if (!comment) {
      httpResponse.NotFound(res, { message: 'Comment not found' });
      return;
    }

    if (comment.user.id !== user.id && user.role !== RoleType.ADMIN) {
      httpResponse.Unauthorized(res, { message: 'Access denied' });
      return;
    }

    next();
  } catch (error) {
    httpResponse.Error(res, { message: 'Internal Server Error' });
  }
};
