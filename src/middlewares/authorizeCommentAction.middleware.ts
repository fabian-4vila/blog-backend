import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/data.source'; // Asegúrate de que esta ruta sea correcta
import { Comment } from '../entities/Comment.entity';
import { AuthenticatedUser } from '../interfaces/AuthUser';
import { RoleType } from '../types/Role.type';

export const authorizeCommentAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as AuthenticatedUser | undefined;
    const commentId = req.params.id;

    if (!user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const commentRepository = AppDataSource.getRepository(Comment);
    const comment = await commentRepository.findOne({ where: { id: commentId }, relations: ['user'] });

    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }

    if (comment.user.id !== user.id && user.role !== RoleType.ADMIN) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    next();
  } catch (error) {
    console.error('Error in authorizeCommentAction middleware:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
