import { Router } from 'express';
import authController from '../auth/controller/AuthController';
import { validateLogin } from '../middlewares/login.middleware';

class AuthRoute {
  public path = '/auth';
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(`${this.path}/login`, validateLogin, authController.login.bind); //bind(authController)
  }
}

export default AuthRoute;
