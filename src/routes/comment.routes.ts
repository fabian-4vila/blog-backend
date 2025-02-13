import { Router } from 'express';
import CommentController from '../comment/controller/commentController';
import CommentService from '../comment/service/comment.service';
import { authenticateJWT, authorizeOwner, authorizeRoles } from '../middlewares/auth.middleware';
import { RoleType } from '../types/Role.type';

class CommentRoute {
  public path = '/comment';
  public router = Router();
  public commentController = new CommentController();
  private commentService = new CommentService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}s`, this.commentController.getAllComments);
    this.router.get(`${this.path}/:id`, this.commentController.getCommentById);
    this.router.post(`${this.path}`, authenticateJWT, this.commentController.createComment);
    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeOwner(async (id: string) => {
        const comment = await this.commentService.getCommentById(id);
        return comment ? { ownerId: comment.user.id } : null;
      }),
      this.commentController.updateCommentById,
    );
    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      this.commentController.deleteCommentById,
    );
  }
}

export default CommentRoute;
