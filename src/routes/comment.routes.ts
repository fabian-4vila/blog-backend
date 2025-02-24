import { Router } from 'express';
import CommentController from '../modules/comment/controller/commentController';
import CommentService from '../modules/comment/service/comment.service';
import { RoleType } from '../types/Role.type';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeOwner } from '../middlewares/ownership.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';

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
