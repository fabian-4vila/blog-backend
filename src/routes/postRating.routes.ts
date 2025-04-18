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
     * /ratingPs:
     *   get:
     *     summary: Get all Post Rating
     *     tags: [Post Rating]
     *     responses:
     *       200:
     *         description: List of ratings retrieved successfully.
     *       404:
     *         description: Rating not found.
     *       500:
     *         description: Server error.
     */
    this.router.get(`${this.path}s`, this.postRatingController.getAllPostRatings);
    /**
     * @swagger
     * /ratingP/{id}:
     *   get:
     *     summary: Get a specific rating by ID
     *     tags: [Post Rating]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the rating
     *     responses:
     *       200:
     *         description: Rating found.
     *       404:
     *         description: Rating not found.
     *       500:
     *         description: Server error.
     */
    this.router.get(`${this.path}/:id`, this.postRatingController.getPostRatingById);
    /**
     * @swagger
     * /ratingP:
     *   post:
     *     summary: Create a new rating for a post
     *     tags: [Post Rating]
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
     *         description: Rating created successfully.
     *       401:
     *         description: Unauthorized.
     *       500:
     *         description: Server error.
     */
    this.router.post(`${this.path}`, authenticateJWT, this.postRatingController.createPostRating);
    /**
     * @swagger
     * /ratingP/{id}:
     *   put:
     *     summary: Update an existing rating
     *     tags: [Post Rating]
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
      authorizeRatingAction,
      this.postRatingController.updatePostRatingById,
    );
    /**
     * @swagger
     * /ratingP/{id}:
     *   delete:
     *     summary: Delete a rating by ID
     *     tags: [Post Rating]
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
      authorizeRatingAction,
      this.postRatingController.deletePostRatingById,
    );
  }
}

export default PostRatingRoute;
