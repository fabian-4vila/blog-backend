import { Router } from 'express';
import PasswordResetController from '../modules/resetPassword/controller/passwordResetController';

class ResetPasswordRoute {
  public path = '/password-reset';
  public router = Router();
  public passwordReset = new PasswordResetController();

  constructor() {
    this.initRoutes();
  }
  /**
   * @swagger
   * /password-reset/request:
   *   post:
   *     summary: Request password reset
   *     description: Send a request to reset the password. An email with a reset token will be sent.
   *     tags: [Password Reset]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *                 example: user@example.com
   *     responses:
   *       200:
   *         description: An email with password reset instructions has been sent.
   *       400:
   *         description: Email is missing or has an invalid format.
   *       500:
   *         description: Internal server error.
   */
  private initRoutes() {
    this.router.post(`${this.path}/request`, this.passwordReset.requestPasswordReset);
    /**
     * @swagger
     * /password-reset/reset/{token}:
     *   post:
     *     summary: Reset password
     *     description: Allows the user to set a new password using a valid token.
     *     tags: [Password Reset]
     *     parameters:
     *       - name: token
     *         in: path
     *         required: true
     *         description: Password reset token provided in the email.
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               newPassword:
     *                 type: string
     *                 format: password
     *                 example: NewPassword123
     *     responses:
     *       200:
     *         description: Password successfully reset.
     *       400:
     *         description: New password is missing or the token is invalid.
     *       401:
     *         description: Token has expired or is invalid.
     *       500:
     *         description: Internal server error.
     */
    this.router.post(`${this.path}/reset/:token`, this.passwordReset.resetPassword);
  }
}
export default ResetPasswordRoute;
