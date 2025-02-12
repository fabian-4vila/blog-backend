import { Router } from 'express';
import CommentRatingController from '../commentRating/controller/commentRatingController';
import CommentRatingService from '../commentRating/service/commentRating.service';
import { authenticateJWT, authorizeOwner, authorizeRoles } from '../middlewares/auth.middleware';
import { RoleType } from '../types/Role.type';

class CommentRatingRoute {
  public path = '/ratingC';
  public router = Router();
  public commentRatingController = new CommentRatingController();
  private commentRatingService = new CommentRatingService(); // ✅ Instancia del servicio

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}s`, this.commentRatingController.getAllCommentRatings);
    this.router.get(`${this.path}/:id`, this.commentRatingController.getCommentRatingById);

    this.router.post(
      `${this.path}`,
      authenticateJWT, // 🔒 Solo autenticados pueden calificar comentarios
      this.commentRatingController.createCommentRating,
    );

    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeOwner(async (id: string) => {
        const rating = await this.commentRatingService.getCommentRatingById(id);
        return rating ? { ownerId: rating.user.id } : null; // 🔒 Solo el dueño puede modificar
      }),
      this.commentRatingController.updateCommentRatingById,
    );

    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeOwner(async (id: string) => {
        const rating = await this.commentRatingService.getCommentRatingById(id);
        return rating ? { ownerId: rating.user.id } : null; // 🔒 Solo el dueño o Admin pueden eliminar
      }),
      authorizeRoles([RoleType.ADMIN]), // 🔒 Permite también a los Admins
      this.commentRatingController.deleteCommentRatingById,
    );
  }
}

export default CommentRatingRoute;
