import { Router } from 'express';
import AuthController from '../modules/Auth/controller/AuthController';

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
        res.status(500).json({ message: 'Server Error', error: (error as Error).message });
      }
    });
  }
}

export default AuthRoute;
