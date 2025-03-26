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
     * tags:
     *   name: Autenticacion
     *   description: Endpoints para iniciar y cerrar sesion
     */

    /**
     * @swagger
     * /auth/login:
     *  post:
     *    summary: Iniciar sesion
     *    description: Permite a un usuario iniciar sesion con sus credenciales.
     *    tags:
     *      - Autenticacion
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
     *        description: Inicio de sesion exitoso.
     *        content:
     *          application/json:
     *            shema:
     *              type: object
     *              properties:
     *                token:
     *                  type: string
     *                  example: "eyJhbGciOiJIUzI1NiIsInR..."
     *      400:
     *        description: Error en la solicitud (datos ivalidos).
     *      500:
     *        description: Error en el servidor.
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
     *     summary: Cerrar sesion
     *     description: cierra la sesion del usuario actual.
     *     tags:
     *       - Autenticacion
     *     responses:
     *       200:
     *         description: Sesion cerrada exitosamente.
     *       500:
     *         description: Error en el servidor.
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
