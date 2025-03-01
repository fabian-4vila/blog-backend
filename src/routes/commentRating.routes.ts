import { Router } from 'express';
import CommentRatingController from '../modules/commentRating/controller/commentRatingController';
import { RoleType } from '../types/Role.type';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';

class CommentRatingRoute {
  public path = '/ratingC';
  public router = Router();
  public commentRatingController = new CommentRatingController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}s`, this.commentRatingController.getAllCommentRatings);
    this.router.get(`${this.path}/:id`, this.commentRatingController.getCommentRatingById);
    this.router.post(`${this.path}`, authenticateJWT, this.commentRatingController.createCommentRating);
    this.router.put(`${this.path}/:id`, authenticateJWT, this.commentRatingController.updateCommentRatingById);
    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      this.commentRatingController.deleteCommentRatingById,
    );
  }
}

export default CommentRatingRoute;
