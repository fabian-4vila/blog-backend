import { Router } from 'express';
import RegisterController from '../modules/register/controller/RegisterController';

class RegisterRoute {
  public path = '/register';
  public router = Router();
  public registerController = new RegisterController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(`${this.path}`, this.registerController.registerUser);
  }
}

export default RegisterRoute;
