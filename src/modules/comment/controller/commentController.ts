import { Request, Response } from 'express';
import { logger } from '../../../utils/logger';
import CommentService from '../service/comment.service';
import { UpdateCommentDto } from '../../../dtos/UpdateCommentDto';
import { AuthenticatedUser } from '../../../interfaces/AuthUser';


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
      res.status(200).json({
        ok: true,
        comment: comments,
        message: `Comments list obtained successfully`,
      });
    } catch (error) {
      logger.error(`${CommentController.name}- Error en getAllComment: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error getting comment',
      });
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
        res.status(404).json({
          ok: false,
          message: 'Comment not found',
        });
        return;
      }
      res.status(200).json({
        ok: true,
        comment,
        message: `Comment details obtained`,
      });
    } catch (error) {
      logger.error(`${CommentController.name}- Error en getCommentById: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error getting comment',
      });
      return;
    }
  };

  /**
   * Create Comment
   */
  public createComment = async (req: Request, res: Response) => {
    try {
      const { body: commentBody } = req;
      const user = req.user as AuthenticatedUser; // Obtener usuario autenticado
      if (!user) {
        res.status(401).json({ ok: false, message: 'User not authenticated' });
        return;
      }
      logger.info(`${CommentController.name}-CreateComment`);
      const newComment = await this.CommentService.createComment(commentBody, user);

      res.status(201).json({
        ok: true,
        comment: newComment,
        message: `Successfully created comment`,
      });
    } catch (error) {
      logger.error(`${CommentController.name}- Error en createComment: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error creating comment',
      });
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

      const updateComment = await this.CommentService.updateCommentById(commentId, updateCommentDto);

      if (!updateComment) {
        res.status(404).json({
          ok: false,
          message: 'Comment not found',
        });
        return;
      }
      res.status(200).json({
        ok: true,
        comment: updateComment,
        message: `Successfully updated comment`,
      });
    } catch (error) {
      logger.info(`${CommentController.name}- Error en updateCommentById: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error updating comment',
      });
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
      const commentDeleted = await this.commentService.deleteCommentById(commentId);
      if (!commentDeleted) {
        res.status(404).json({
          ok: false,
          message: 'Comment not found',
        });
        return;
      }
      res.status(200).json({
        ok: true,
        comment: commentDeleted,
        message: `Comment deleted successfully`,
      });
    } catch (error) {
      logger.error(`${CommentController.name}- Error en deleteCommentById: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error deleting comment',
      });
      return;
    }
  };
}

export default CommentController;
