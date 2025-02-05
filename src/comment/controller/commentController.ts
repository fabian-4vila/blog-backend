import { Request, Response } from 'express';
import { logger } from '../../utils/logger';
import CommentService from '../service/commentService';

class CommentController {
  private readonly CommentService: CommentService = new CommentService();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  /**
   * getAllComments
   */
  public getAllComments = async (_req: Request, res: Response) => {
    try {
      logger.info(`${CommentController.name}-getAllComments`);
      const comments = await this.CommentService.getAllComments();
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
   * getCommentById
   */
  public getCommentById = async (req: Request, res: Response) => {
    try {
      const { id: CommentId } = req.params;
      logger.info(`${CommentController.name}-getCommentById: ${CommentId}`);
      const comment = await this.CommentService.getCommentById(CommentId);
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
   * createComment
   */
  public createComment = async (req: Request, res: Response) => {
    try {
      const { body: commentBody } = req;
      logger.info(`${CommentController.name}-CreateComment`);
      const newComment = await this.CommentService.createComment(commentBody);
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
      return;
    }
  };

  /**
   * updateCommentById
   */
  public updateCommentById = async (req: Request, res: Response) => {
    try {
      const { id: commentId } = req.params;
      const { body: commentBody } = req;
      logger.info(`${CommentController.name}-updateCommentById: ${commentId}`);
      const updateComment = await this.CommentService.updateCommentById(commentId, commentBody);
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
   * deleteCommentById
   */
  public deleteCommentById = async (req: Request, res: Response) => {
    try {
      const { id: commentId } = req.params;
      logger.info(`${CommentController.name}-deleteUserById: ${commentId}`);
      const commentDeleted = await this.CommentService.deleteCommentById(commentId);
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
