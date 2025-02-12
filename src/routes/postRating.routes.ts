import { Router } from 'express';
import PostRatingController from '../postRating/controller/postRatingController';
import PostRatingService from '../postRating/service/postRating.service';
import { authenticateJWT, authorizeOwner, authorizeRoles } from '../middlewares/auth.middleware';
import { RoleType } from '../types/Role.type';

class PostRatingRoute {
  public path = '/ratingP';
  public router = Router();
  public postRatingController = new PostRatingController();
  private postRatingService = new PostRatingService(); // ✅ Instancia del servicio

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}s`, this.postRatingController.getAllPostRatings);
    this.router.get(`${this.path}/:id`, this.postRatingController.getPostRatingById);

    this.router.post(
      `${this.path}`,
      authenticateJWT, // 🔒 Solo autenticados pueden calificar
      this.postRatingController.createPostRating,
    );

    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeOwner(async (id: string) => {
        const rating = await this.postRatingService.getPostRatingById(id);
        return rating ? { ownerId: rating.user.id } : null; // 🔒 Solo el dueño puede modificar
      }),
      this.postRatingController.updatePostRatingById,
    );

    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeOwner(async (id: string) => {
        const rating = await this.postRatingService.getPostRatingById(id);
        return rating ? { ownerId: rating.user.id } : null; // 🔒 Solo el dueño o Admin pueden eliminar
      }),
      authorizeRoles([RoleType.ADMIN]), // 🔒 Permite también a los Admins
      this.postRatingController.deletePostRatingById,
    );
  }
}

export default PostRatingRoute;
