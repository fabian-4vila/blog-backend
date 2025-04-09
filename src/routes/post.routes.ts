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
     *     summary: Get all posts
     *     description: Returns a list of all available posts.
     *     tags:
     *       - Posts
     *     responses:
     *       200:
     *         description: List of posts retrieved successfully.
     *       500:
     *         description: Server error.
     */
    this.router.get(`${this.path}s`, this.postController.getAllPosts);
    /**
     * @swagger
     * /post/{id}:
     *   get:
     *     operationId: "2_getPostById"
     *     summary: Get a post by ID
     *     description: Returns a specific post by its ID.
     *     tags:
     *       - Posts
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the post
     *     responses:
     *       200:
     *         description: Post found.
     *       404:
     *         description: Post not found.
     *       500:
     *         description: Server error.
     */
    this.router.get(`${this.path}/:id`, this.postController.getPostById);
    /**
     * @swagger
     * /post:
     *   post:
     *     operationId: "3_createPost"
     *     summary: Create a new post
     *     description: Creates a new post. Only accessible to administrators.
     *     tags:
     *       - Posts
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
     *                 description: Title of the post.
     *               content:
     *                 type: string
     *                 description: Content of the post.
     *               user_id:
     *                 type: string
     *                 description: ID of the user creating the post.
     *               files:
     *                 type: array
     *                 items:
     *                   type: string
     *                   format: binary
     *                 description: Attached files.
     *     responses:
     *       201:
     *         description: Post created successfully.
     *       400:
     *         description: Invalid data.
     *       401:
     *         description: Unauthorized.
     *       500:
     *         description: Server error.
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
     *     summary: Update a post by ID
     *     description: Modifies the data of an existing post. Only accessible to administrators.
     *     tags:
     *       - Posts
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the post
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 description: New title of the post.
     *               content:
     *                 type: string
     *                 description: New content of the post.
     *               files:
     *                 type: array
     *                 items:
     *                   type: string
     *                   format: binary
     *                 description: New attached files.
     *     responses:
     *       200:
     *         description: Post updated successfully.
     *       400:
     *         description: Invalid data.
     *       401:
     *         description: Unauthorized.
     *       404:
     *         description: Post not found.
     *       500:
     *         description: Server error.
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
     *      summary: Delete a post by ID
     *      description: Deletes an existing post. Only accessible to administrators.
     *      tags:
     *        - Posts
     *      security:
     *        - BearerAuth: []
     *      parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          schema:
     *            type: string
     *          description: ID of the post to delete
     *      responses:
     *        200:
     *          description: Post deleted successfully.
     *        401:
     *          description: Unauthorized.
     *        404:
     *          description: Post not found.
     *        500:
     *          description: Server error.
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
