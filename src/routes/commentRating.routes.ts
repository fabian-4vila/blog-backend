import { Router } from 'express';
import CommentRatingController from '../modules/commentRating/controller/commentRatingController';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeCommentRatingAction } from '../middlewares/authorizeCommentRatingAction.middleware';

class CommentRatingRoute {
  public path = '/ratingC';
  public router = Router();
  public commentRatingController = new CommentRatingController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    /**
     * @swagger
     * /ratingCs:
     *   get:
     *     summary: Obtener todas las calificaciones de comentarios
     *     tags: [Calificacion de Comentario]
     *     security:
     *       - CookieAuth: []
     *     responses:
     *       200:
     *         description: Lista de calificaciones obtenida correctamente.
     *       401:
     *         description: No autorizado.
     *       404:
     *         description: Calificacion no encontrada.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.get(`${this.path}s`, authenticateJWT, this.commentRatingController.getAllCommentRatings);
    this.router.get(`${this.path}/:id`, authenticateJWT, this.commentRatingController.getCommentRatingById);
    this.router.post(`${this.path}`, authenticateJWT, this.commentRatingController.createCommentRating);
    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeCommentRatingAction,
      this.commentRatingController.updateCommentRatingById,
    );
    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeCommentRatingAction,
      this.commentRatingController.deleteCommentRatingById,
    );
  }
}

export default CommentRatingRoute;
