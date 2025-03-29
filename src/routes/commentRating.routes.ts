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
     *     tags: [Calificacion de Comentarios]
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
    /**
     * @swagger
     * /ratingC/{id}:
     *   get:
     *     summary: Obtener una calificación específica de un comentario por ID
     *     tags: [Calificacion de Comentarios]
     *     security:
     *       - CookieAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID de la calificación del comentario
     *     responses:
     *       200:
     *         description: Calificación encontrada.
     *       404:
     *         description: Calificación no encontrada.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.get(`${this.path}/:id`, authenticateJWT, this.commentRatingController.getCommentRatingById);
    /**
     * @swagger
     * /ratingC:
     *   post:
     *     summary: Crear una nueva calificación para un comentario
     *     tags: [Calificacion de Comentarios]
     *     security:
     *       - CookieAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               stars:
     *                 type: integer
     *                 example: 4
     *               likeDislike:
     *                 type: boolean
     *                 example: true
     *               userId:
     *                 type: string
     *                 example: "25c601dd-7610-4ccd-aa0b-59astfiav5"
     *               commentId:
     *                 type: integer
     *                 example: 42
     *     responses:
     *       201:
     *         description: Calificación creada exitosamente.
     *       401:
     *         description: No autorizado.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.post(`${this.path}`, authenticateJWT, this.commentRatingController.createCommentRating);
    /**
     * @swagger
     * /ratingC/{id}:
     *   put:
     *     summary: Actualizar una calificación de comentario existente
     *     tags: [Calificacion de Comentarios]
     *     security:
     *       - CookieAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID de la calificación a actualizar
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               stars:
     *                 type: integer
     *                 example: 4
     *               likeDislike:
     *                 type: boolean
     *                 example: true
     *     responses:
     *       200:
     *         description: Calificación actualizada exitosamente.
     *       401:
     *         description: No autorizado.
     *       404:
     *         description: Calificación no encontrada.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeCommentRatingAction,
      this.commentRatingController.updateCommentRatingById,
    );
    /**
     * @swagger
     * /ratingC/{id}:
     *   delete:
     *     summary: Eliminar una calificación de comentario por ID
     *     tags: [Calificacion de Comentarios]
     *     security:
     *       - CookieAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID de la calificación a eliminar
     *     responses:
     *       200:
     *         description: Calificación eliminada exitosamente.
     *       404:
     *         description: Calificación no encontrada.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeCommentRatingAction,
      this.commentRatingController.deleteCommentRatingById,
    );
  }
}

export default CommentRatingRoute;
