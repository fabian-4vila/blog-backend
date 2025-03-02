import { Request, Response } from 'express';
import { logger } from '../../../utils/logger';
import CommentService from '../service/comment.service';
import { UpdateCommentDto } from '../../../dtos/UpdateCommentDto';
import { AuthenticatedUser } from '../../../interfaces/AuthUser';
import { HttpResponse } from '../../../shared/http.response';
import { instanceToPlain } from 'class-transformer';
import { DeleteResult } from 'typeorm';

class CommentController {
  constructor(
    private readonly commentService: CommentService = new CommentService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  /**
   * Get All Comments
   */
  public getAllComments = async (_req: Request, res: Response) => {
    try {
      logger.info(`${CommentController.name}-getAllComments`);
      const comments = await this.commentService.getAllComments();
      this.httpResponse.Ok(res, {
        user: instanceToPlain(comments),
      });
    } catch (error) {
      logger.error(`${CommentController.name}- Error en getAllComment: ${error}`);
      this.httpResponse.Error(res, 'Error getting comment');
      return;
    }
  };

  /**
   * Get Comment By Id
   */
  public getCommentById = async (req: Request, res: Response) => {
    try {
      const { id: CommentId } = req.params;
      logger.info(`${CommentController.name}-getCommentById: ${CommentId}`);
      const comment = await this.commentService.getCommentById(CommentId);
      if (!comment) {
        this.httpResponse.NotFound(res, {
          comment: instanceToPlain(comment),
        });
        return;
      }
      this.httpResponse.Ok(res, {
        comment: instanceToPlain(comment),
      });
    } catch (error) {
      logger.error(`${CommentController.name}- Error en getCommentById: ${error}`);
      this.httpResponse.Error(res, 'Error getting comment');
      return;
    }
  };

  /**
   * Create Comment
   */
  public createComment = async (req: Request, res: Response) => {
    try {
      const { body: commentBody } = req;
      const user = req.user as AuthenticatedUser;
      if (!user) {
        this.httpResponse.Unauthorized(res, 'User not authenticated');
        return;
      }
      logger.info(`${CommentController.name}-CreateComment`);
      const newComment = await this.commentService.createComment(commentBody, user);
      this.httpResponse.Create(res, {
        comment: instanceToPlain(newComment),
      });
    } catch (error) {
      logger.error(`${CommentController.name}- Error en createComment: ${error}`);
      this.httpResponse.Error(res, 'Error creating comment');
    }
  };

  /**
   * Update Comment By Id
   */
  public updateCommentById = async (req: Request, res: Response) => {
    try {
      const { id: commentId } = req.params;
      const updateCommentDto: UpdateCommentDto = req.body;
      logger.info(`${CommentController.name}-updateCommentById: ${commentId}`);
      const updateComment: DeleteResult = await this.commentService.updateCommentById(commentId, updateCommentDto);
      if (!updateComment.affected) {
        this.httpResponse.NotFound(res, 'Comment not found');
        return;
      }
      this.httpResponse.Ok(res, {
        comment: instanceToPlain(updateComment),
      });
    } catch (error) {
      logger.info(`${CommentController.name}- Error en updateCommentById: ${error}`);
      this.httpResponse.Error(res, 'Error updating comment');
      return;
    }
  };

  /**
   * Delete Comment by Id
   */
  public deleteCommentById = async (req: Request, res: Response) => {
    try {
      const { id: commentId } = req.params;
      logger.info(`${CommentController.name}-deleteUserById: ${commentId}`);
      const commentDeleted: DeleteResult = await this.commentService.deleteCommentById(commentId);
      if (!commentDeleted.affected) {
        this.httpResponse.NotFound(res, 'Comment not found');
        return;
      }
      this.httpResponse.Ok(res, {
        comment: commentDeleted,
      });
    } catch (error) {
      logger.error(`${CommentController.name}- Error en deleteCommentById: ${error}`);
      this.httpResponse.Error(res, 'Error deleting comment');
      return;
    }
  };
}

export default CommentController;
