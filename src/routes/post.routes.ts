import { Router } from 'express';
import PostController from '../modules/post/controller/PostController';
import upload from '../config/multer.config';

import { RoleType } from '../types/Role.type';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';
import { fileFilterMiddleware } from '../middlewares/fileFilter.middleware';

class PostRoute {
  public path = '/post';
  public router = Router();
  public postController = new PostController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    /**
     * @swagger
     * /posts:
     *   get:
     *     operationId: "1_getAllPost"
     *     summary: obtener todas las publicaciones
     *     description: Devuelve una lista de todas las publicaciones disponibles.
     *     tags:
     *       - Posteos
     *     responses:
     *       200:
     *         description: Lista de publicaciones obtenida con exito.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.get(`${this.path}s`, this.postController.getAllPosts);
    /**
     * @swagger
     * /post/{id}:
     *   get:
     *     operationId: "2_getPostById"
     *     summary: Obtener una publicacion por ID
     *     description: Devuelve una publicacion especifica segun su ID.
     *     tags:
     *       - Posteos
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID de la publicacion
     *     responses:
     *       200:
     *         description: Publicacion encontrada.
     *       404:
     *         description: publicacion no encontrada.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.get(`${this.path}/:id`, this.postController.getPostById);
    /**
     * @swagger
     * /post:
     *   post:
     *     operationId: "3_createPost"
     *     summary: Crear una nueva publicación
     *     description: Crea una nueva publicación. Solo accesible para administradores.
     *     tags:
     *       - Posteos
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 description: Título de la publicación.
     *               content:
     *                 type: string
     *                 description: Contenido de la publicación.
     *               user_id:
     *                 type: string
     *                 description: ID del usuario que crea la publicación.
     *               files:
     *                 type: array
     *                 items:
     *                   type: string
     *                   format: binary
     *                 description: Archivos adjuntos.
     *     responses:
     *       201:
     *         description: Publicación creada con éxito.
     *       400:
     *         description: Datos inválidos.
     *       401:
     *         description: No autorizado.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.post(
      `${this.path}`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      upload.array('files', 5),
      fileFilterMiddleware,
      this.postController.createPost,
    );
    /**
     * @swagger
     * /post/{id}:
     *   put:
     *     operationId: "4_updatePostById"
     *     summary: Actualizar una publicacion por ID
     *     description: Modifica los datoa de una publicacion existente. Solo accesible para administradores.
     *     tags:
     *       - Posteos
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID de la publicacion
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 description: Nuevo titulo de la publicacion.
     *               content:
     *                 type: text
     *                 description: Nuevo contenido de la publicacion.
     *               files:
     *                 type: array
     *                 items:
     *                   type: string
     *                   format: binary
     *                 description: Nuevos archivos adjuntos.
     *     responses:
     *       200:
     *         description: Publicacion actualizada con exito.
     *       400:
     *         description: Datos invalidos.
     *       401:
     *         description: No autorizado.
     *       404:
     *         description: Publicacion no encontrada.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      upload.array('files', 5),
      fileFilterMiddleware,
      this.postController.updatePostById,
    );
    /**
     * @swagger
     *  /post/{id}:
     *    delete:
     *      operationId: "5_deletePostById"
     *      summary: Eliminar una publicacion por ID
     *      description: Elimina una publicacion existente. Solo accesible para admisnitadores
     *      tags:
     *        - Posteos
     *      security:
     *        - BearerAuth: []
     *      parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          schema:
     *            type: string
     *          description: ID dela publicacion a eliminar
     *      responses:
     *        200:
     *          description: Publicacion eliminada con exito.
     *        401:
     *          description: No autorizado.
     *        404:
     *          descriptio: publicacion no encontrada.
     *        500:
     *          description: Error en el servidor.
     */
    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      this.postController.deletePostById,
    );
  }
}

export default PostRoute;
