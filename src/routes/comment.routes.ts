import { Router } from 'express';
import CommentController from '../modules/comment/controller/commentController';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeCommentAction } from '../middlewares/authorizeCommentAction.middleware';

class CommentRoute {
  public path = '/comment';
  public router = Router();
  public commentController = new CommentController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    /**
     * @swagger
     * /comments:
     *   get:
     *     operationId: "1_getAllComments"
     *     summary: Get all comments
     *     description: Returns a list of all available comments.
     *     tags: [Comment]
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: List of comments successfully retrieved.
     *       401:
     *         description: Unauthorized.
     *       500:
     *         description: Server error.
     */
    this.router.get(`${this.path}s`, authenticateJWT, this.commentController.getAllComments);
    /**
     * @swagger
     * /comment/{id}:
     *   get:
     *     operationId: "2_getCommentById"
     *     summary: Obtener un comentario por su ID
     *     descriptio: Devuelve un comentario espesifico segun su ID.
     *     tags:
     *       - Comentarios
     *     security:
     *       -BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del comentario
     *     responses:
     *       200:
     *         description: Comentario encontrado.
     *       401:
     *         description: No autorizado.
     *       404:
     *         description: Comentario no encontrado.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.get(`${this.path}/:id`, authenticateJWT, this.commentController.getCommentById);
    /**
     * @swagger
     * /comment:
     *   post:
     *     operationId: "3_createComment"
     *     summary: Crear un nuevo comentario
     *     description: Crea un nuevo comentario en una publicacion.
     *     tags:
     *       - Comentarios
     *     security:
     *       -BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               postId:
     *                 type: string
     *                 description: ID de la publicacion asociada.
     *               content:
     *                 type: string
     *                 description: COntenido del comentario.
     *     responses:
     *       201:
     *         description: Comentario creado con exito.
     *       401:
     *         description: No autorizado.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.post(`${this.path}`, authenticateJWT, this.commentController.createComment);
    /**
     * @swagger
     * /comment/{id}:
     *   put:
     *     operationId: "4_updateCommentById"
     *     summary: Actualizar un comentario por ID
     *     description: Modifica los datos de un comentario existente.
     *     tags:
     *       - Comentarios
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del comentario
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               content:
     *                 type: string
     *                 description: Nuevo contenido del comentario.
     *     responses:
     *       200:
     *         description: Comentario actualizado con éxito.
     *       401:
     *         description: No autorizado.
     *       404:
     *         description: Comentario no encontrado.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeCommentAction,
      this.commentController.updateCommentById,
    );
    /**
     * @swagger
     * /comment/{id}:
     *   delete:
     *     operationId: "5_deleteCommentById"
     *     summary: Eliminar un comentario por ID
     *     description: Elimina un comentario existente.
     *     tags:
     *       - Comentarios
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del comentario a eliminar
     *     responses:
     *       200:
     *         description: Comentario eliminado con éxito.
     *       401:
     *         description: No autorizado.
     *       404:
     *         description: Comentario no encontrado.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeCommentAction,
      this.commentController.deleteCommentById,
    );
  }
}

export default CommentRoute;
