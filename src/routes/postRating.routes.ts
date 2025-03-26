import { Router } from 'express';
import PostRatingController from '../modules/postRating/controller/postRatingController';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRatingAction } from '../middlewares/authorizePostRatingAction.middleware';

class PostRatingRoute {
  public path = '/ratingP';
  public router = Router();
  public postRatingController = new PostRatingController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    /**
     * @swagger
     * tags:
     *   name: PostRatings
     *   description: Endpoints para gestionar las calificaciones de los posts
     */

    /**
     * @swagger
     * /ratingPs:
     *   get:
     *     summary: Obtener todas las calificaciones de los posts
     *     tags: [PostRatings]
     *     responses:
     *       200:
     *         description: Lista de calificaciones obtenida correctamente.
     *       404:
     *         description: Calificación no encontrada
     *       500:
     *         description: Error en el servidor
     */
    this.router.get(`${this.path}s`, this.postRatingController.getAllPostRatings);

    /**
     * @swagger
     * /ratingP/{id}:
     *   get:
     *     summary: Obtener una calificación específica por ID
     *     tags: [PostRatings]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID de la calificación
     *     responses:
     *       200:
     *         description: Calificaion encontrada.
     *       404:
     *         description: Calificación no encontrada
     *       500:
     *         description: Error en el servidor
     */
    this.router.get(`${this.path}/:id`, this.postRatingController.getPostRatingById);

    /**
     * @swagger
     * /ratingP:
     *   post:
     *     summary: Crear una nueva calificación para un post
     *     tags: [PostRatings]
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
     *               postId:
     *                 type: integer
     *                 example: 18
     *     responses:
     *       201:
     *         description: Calificación creada exitosamente
     *       401:
     *         description: No autorizado
     *       500:
     *         description: Error en el servidor
     */
    this.router.post(`${this.path}`, authenticateJWT, this.postRatingController.createPostRating);

    /**
     * @swagger
     * /ratingP/{id}:
     *   put:
     *     summary: Actualizar una calificación existente
     *     tags: [PostRatings]
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
     *         description: Calificación actualizada exitosamente
     *       401:
     *         description: No autorizado
     *       404:
     *         description: Calificación no encontrada
     *       500:
     *         description: Error en el servidor
     */
    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRatingAction,
      this.postRatingController.updatePostRatingById,
    );
    /**
     * @swagger
     * /ratingP/{id}:
     *   delete:
     *     summary: Eliminar una calificación por ID
     *     tags: [PostRatings]
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
     *         description: Calificación eliminada exitosamente
     *       404:
     *         description: Calificación no encontrada
     *       500:
     *         description: Error en el servidor
     */
    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRatingAction,
      this.postRatingController.deletePostRatingById,
    );
  }
}

export default PostRatingRoute;
