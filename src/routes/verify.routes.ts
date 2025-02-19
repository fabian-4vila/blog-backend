import { Router } from 'express';
import VerifyController from '../modules/verify/controller/VerifyController';

class VerifyRoute {
  public path = '/verify';
  public router = Router();
  public verifyController = new VerifyController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}/:token`, this.verifyController.verifyEmail);
  }
}

export default VerifyRoute;
