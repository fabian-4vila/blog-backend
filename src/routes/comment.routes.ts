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
     *     summary: obtener todos los comentarios
     *     description: Devuelve una lista de todos los comentarios disponibles.
     *     tags:
     *       - Comentarios
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de comentarios obtenida con exito.
     *       401:
     *         description: No autorizado.
     *       500:
     *         description: Error en el servidor.
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
    this.router.post(`${this.path}`, authenticateJWT, this.commentController.createComment);
    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeCommentAction,
      this.commentController.updateCommentById,
    );
    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeCommentAction,
      this.commentController.deleteCommentById,
    );
  }
}

export default CommentRoute;
