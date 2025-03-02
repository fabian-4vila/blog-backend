import { Router } from 'express';
import CommentController from '../modules/comment/controller/commentController';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeCommentAction } from '../middlewares/authorizeCommentAction.middleware';

class CommentRoute {
  public path = '/comment';
  public router = Router();
  public commentController = new CommentController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}s`, authenticateJWT, this.commentController.getAllComments);
    this.router.get(`${this.path}/:id`, authenticateJWT, this.commentController.getCommentById);
    this.router.post(`${this.path}`, authenticateJWT, this.commentController.createComment);
    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeCommentAction,
      this.commentController.updateCommentById,
    );
    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeCommentAction,
      this.commentController.deleteCommentById,
    );
  }
}

export default CommentRoute;
