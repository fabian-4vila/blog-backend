import { Router } from 'express';
import PostRatingController from '../modules/postRating/controller/postRatingController';
import { RoleType } from '../types/Role.type';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';

class PostRatingRoute {
  public path = '/ratingP';
  public router = Router();
  public postRatingController = new PostRatingController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}s`, this.postRatingController.getAllPostRatings);
    this.router.get(`${this.path}/:id`, this.postRatingController.getPostRatingById);
    this.router.post(`${this.path}`, authenticateJWT, this.postRatingController.createPostRating);
    this.router.put(`${this.path}/:id`, authenticateJWT, this.postRatingController.updatePostRatingById);
    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      this.postRatingController.deletePostRatingById,
    );
  }
}

export default PostRatingRoute;
