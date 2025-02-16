import { Router } from 'express';
import PostRatingController from '../modules/postRating/controller/postRatingController';
import PostRatingService from '../modules/postRating/service/postRating.service';
import { authenticateJWT, authorizeOwner, authorizeRoles } from '../middlewares/auth.middleware';
import { RoleType } from '../types/Role.type';

class PostRatingRoute {
  public path = '/ratingP';
  public router = Router();
  public postRatingController = new PostRatingController();
  private postRatingService = new PostRatingService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}s`, this.postRatingController.getAllPostRatings);
    this.router.get(`${this.path}/:id`, this.postRatingController.getPostRatingById);
    this.router.post(`${this.path}`, authenticateJWT, this.postRatingController.createPostRating);
    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeOwner(async (id: string) => {
        const rating = await this.postRatingService.getPostRatingById(id);
        return rating ? { ownerId: rating.user.id } : null;
      }),
      this.postRatingController.updatePostRatingById,
    );
    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeOwner(async (id: string) => {
        const rating = await this.postRatingService.getPostRatingById(id);
        return rating ? { ownerId: rating.user.id } : null;
      }),
      authorizeRoles([RoleType.ADMIN]),
      this.postRatingController.deletePostRatingById,
    );
  }
}

export default PostRatingRoute;
