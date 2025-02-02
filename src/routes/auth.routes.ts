import { Router } from 'express';
import AuthController from '../auth/controller/AuthController';
import { validateLogin } from '../middlewares/login.middleware';

class AuthRoute {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    // Ruta para iniciar sesión
    this.router.post(`${this.path}/login`, validateLogin, this.authController.login);

    // Ruta para registrar un usuario
    this.router.post(`${this.path}/register`, this.authController.register);

    // Ruta para renovar el token
    this.router.post(`${this.path}/refresh-token`, this.authController.refreshToken);
  }
}

export default AuthRoute;
