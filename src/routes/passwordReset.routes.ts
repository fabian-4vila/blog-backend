import { Router } from 'express';
import PasswordResetController from '../modules/resetPassword/controller/passwordResetController';

class ResetPasswordRoute {
  public path = '/password-reset';
  public router = Router();
  public passwordReset = new PasswordResetController();

  constructor() {
    this.initRoutes();
  }
  private initRoutes() {
    this.router.post(`${this.path}/request`, this.passwordReset.requestPasswordReset);

    this.router.post(`${this.path}/reset/:token`, this.passwordReset.resetPassword);
  }
}
export default ResetPasswordRoute;
