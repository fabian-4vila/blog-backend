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
     * tags:
     *   name: Posts
     *   description: Endpoints para la gestion de publicaciones
     */

    /**
     * @swagger
     * /posts:
     *   get:
     *     operationId: "1_getAllPost"
     *     summary: obtener todas las publicaciones
     *     description: Devuelve una lista de todas las publicaciones disponibles.
     *     tags:
     *       - Posts
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
     *       - Post
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

    this.router.post(
      `${this.path}`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      upload.array('files', 5),
      fileFilterMiddleware,
      this.postController.createPost,
    );

    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      upload.array('files', 5),
      fileFilterMiddleware,
      this.postController.updatePostById,
    );

    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      this.postController.deletePostById,
    );
  }
}

export default PostRoute;
