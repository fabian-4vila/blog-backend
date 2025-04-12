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
     *     summary: Get all comment ratings
     *     tags: [Comment Rating]
     *     security:
     *       - CookieAuth: []
     *     responses:
     *       200:
     *         description: List of ratings retrieved successfully.
     *       401:
     *         description: Unauthorized.
     *       404:
     *         description: Rating not found.
     *       500:
     *         description: Server error.
     */
    this.router.get(`${this.path}s`, authenticateJWT, this.commentRatingController.getAllCommentRatings);
    /**
     * @swagger
     * /ratingC/{id}:
     *   get:
     *     summary: Get a specific comment rating by ID
     *     tags: [Comment Rating]
     *     security:
     *       - CookieAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Comment rating ID
     *     responses:
     *       200:
     *         description: Rating found.
     *       404:
     *         description: Rating not found.
     *       500:
     *         description: Server error.
     */
    this.router.get(`${this.path}/:id`, authenticateJWT, this.commentRatingController.getCommentRatingById);
    /**
     * @swagger
     * /ratingC:
     *   post:
     *     summary: Create a new comment rating
     *     tags: [Comment Ratings]
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
     *         description: Rating created successfully.
     *       401:
     *         description: Unauthorized.
     *       500:
     *         description: Server error.
     */
    this.router.post(`${this.path}`, authenticateJWT, this.commentRatingController.createCommentRating);
    /**
     * @swagger
     * /ratingC/{id}:
     *   put:
     *     summary: Update an existing comment rating
     *     tags: [Comment Rating]
     *     security:
     *       - CookieAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the rating to update
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
     *         description: Rating updated successfully.
     *       401:
     *         description: Unauthorized.
     *       404:
     *         description: Rating not found.
     *       500:
     *         description: Server error.
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
     *     summary: Delete a comment rating by ID
     *     tags: [Comment Rating]
     *     security:
     *       - CookieAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the rating to delete
     *     responses:
     *       200:
     *         description: Rating deleted successfully.
     *       404:
     *         description: Rating not found.
     *       500:
     *         description: Server error.
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
