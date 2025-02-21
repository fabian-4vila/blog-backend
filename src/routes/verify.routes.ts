import { Router } from 'express';
import VerificationController from '../modules/verify/controller/verifyController';

class VerificationRoute {
  public path = '/verification';
  public router = Router();
  public verificationController = new VerificationController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(`${this.path}/send-email`, this.verificationController.sendVerificationEmail);

    this.router.get(`${this.path}/verify/:token`, this.verificationController.verifyEmailToken);
  }
}

export default VerificationRoute;
