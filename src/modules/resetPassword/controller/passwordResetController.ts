import { Request, Response } from 'express';
import { logger } from '../../../utils/logger';
import PasswordResetService from '../service/passwordReset.service';
import { sendPasswordResetEmail } from '../../../utils/email';
import { HttpResponse } from '../../../shared/http.response';

class PasswordResetController {
  constructor(
    private readonly passwordResetService: PasswordResetService = new PasswordResetService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}
  /**
   * requestPasswordReset
   */
  public requestPasswordReset = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      logger.info(`${PasswordResetController.name} - requestPasswordReset: ${email}`);
      if (!email) {
        this.httpResponse.BadRequest(res, 'El correo es obligatorio.');
        return;
      }
      const token = await this.passwordResetService.generateResetToken(email);
      if (!token) {
        this.httpResponse.Ok(res, 'If the email is registered, you will receive a password reset link.');
        return;
      }
      await sendPasswordResetEmail(email, token);
      this.httpResponse.Ok(res, 'A password reset email has been sent. Please check your inbox and spam folder.');
    } catch (error) {
      logger.error(`${PasswordResetController.name} - Error en requestPasswordReset: ${error}`);
      this.httpResponse.Error(res, 'An error occurred while processing your request. Please try again later.');
    }
  };

  /**
   * resetPassword
   */
  public resetPassword = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;
      logger.info(`${PasswordResetController.name} - resetPassword`);
      if (!token || !newPassword) {
        this.httpResponse.BadRequest(res, 'El token y la nueva contraseña son obligatorios.');
        return;
      }
      const result = await this.passwordResetService.resetPassword(token, newPassword);
      if (!result) {
        this.httpResponse.BadRequest(res, 'No se pudo restablecer la contraseña. Verifica tu token.');
        return;
      }
      this.httpResponse.Ok(res, 'Your password has been reset successfully.');
    } catch (error) {
      logger.error(`${PasswordResetController.name} - Error en resetPassword: ${error}`);
      this.httpResponse.Error(res, 'An error occurred while resetting the password. Please try again later.');
    }
  };
}

export default PasswordResetController;
