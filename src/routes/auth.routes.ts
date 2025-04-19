import { Router } from 'express';
import AuthController from '../modules/Auth/controller/AuthController';
import { validateLogin } from '../middlewares/login.middleware';

class AuthRoute {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    /**
     * @swagger
     * /auth/login:
     *  post:
     *    summary: Log in
     *    description: Allows a user to log in with their credentials.
     *    tags: [Authentication]
     *    requestBody:
     *       required: true
     *       content:
     *           application/json:
     *              schema:
     *                type: object
     *                required:
     *                   - email
     *                   - password
     *                properties:
     *                  email:
     *                    type: string
     *                    example: marcos@gmail.com
     *                  password:
     *                    type: string
     *                    example: "12345678"
     *    responses:
     *      200:
     *        description: Successful login.
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                token:
     *                  type: string
     *                  example: "eyJhbGciOiJIUzI1NiIsInR..."
     *      400:
     *        description: Bad request (invalid data).
     *      500:
     *        description: Server error.
     */
    this.router.post(`${this.path}/login`, validateLogin, async (req, res) => {
      try {
        await this.authController.login(req, res);
      } catch (error) {
        res.status(500).json({ message: 'Server Error', error: (error as Error).message });
      }
    });

    /**
     * @swagger
     * /auth/logout:
     *   post:
     *     summary: Log out
     *     description: Logs out the current user.
     *     tags: [Authentication]
     *     responses:
     *       200:
     *         description: Successfully logged out.
     *       500:
     *         description: Server error.
     */
    this.router.post(`${this.path}/logout`, async (req, res) => {
      try {
        await this.authController.logout(req, res);
      } catch (error) {
        res.status(500).json({ message: 'Server Error', error: (error as Error).message });
      }
    });
  }
}

export default AuthRoute;
