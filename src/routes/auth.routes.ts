import { Router } from 'express';
import AuthController from '../Auth/controller/AuthController'; // Asegura que la ruta sea correcta

class AuthRoute {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(`${this.path}/login`, async (req, res) => {
      try {
        await this.authController.login(req, res);
      } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: (error as Error).message });
      }
    });
  }
}

export default AuthRoute;
