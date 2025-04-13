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
     *     summary: Get a comment by ID
     *     description: Returns a specific comment by its ID.
     *     tags: [Comment]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the comment
     *     responses:
     *       200:
     *         description: Comment found.
     *       401:
     *         description: Unauthorized.
     *       404:
     *         description: Comment not found.
     *       500:
     *         description: Server error.
     */
    this.router.get(`${this.path}/:id`, authenticateJWT, this.commentController.getCommentById);
    /**
     * @swagger
     * /comment:
     *   post:
     *     summary: Create a new comment
     *     description: Creates a new comment on a post.
     *     tags: [Comment]
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               postId:
     *                 type: string
     *                 description: ID of the associated post.
     *               content:
     *                 type: string
     *                 description: Content of the comment.
     *     responses:
     *       201:
     *         description: Comment successfully created.
     *       401:
     *         description: Unauthorized.
     *       500:
     *         description: Server error.
     */
    this.router.post(`${this.path}`, authenticateJWT, this.commentController.createComment);
    /**
     * @swagger
     * /comment/{id}:
     *   put:
     *     summary: Update a comment by ID
     *     description: Modifies the data of an existing comment.
     *     tags: [Comment]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the comment
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               content:
     *                 type: string
     *                 description: New content of the comment.
     *     responses:
     *       200:
     *         description: Comment successfully updated.
     *       401:
     *         description: Unauthorized.
     *       404:
     *         description: Comment not found.
     *       500:
     *         description: Server error.
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
     *     summary: Delete a comment by ID
     *     description: Deletes an existing comment.
     *     tags: [Comment]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the comment to delete
     *     responses:
     *       200:
     *         description: Comment successfully deleted.
     *       401:
     *         description: Unauthorized.
     *       404:
     *         description: Comment not found.
     *       500:
     *         description: Server error.
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
