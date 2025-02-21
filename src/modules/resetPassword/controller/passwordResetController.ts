import { Request, Response } from 'express';
import { logger } from '../../../utils/logger';
import PasswordResetService from '../service/passwordReset.service';
import { sendPasswordResetEmail } from '../../../utils/email';

class PasswordResetController {
  private readonly passwordResetService: PasswordResetService = new PasswordResetService();

  /**
   * requestPasswordReset
   */
  public requestPasswordReset = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      logger.info(`${PasswordResetController.name} - requestPasswordReset: ${email}`);

      const token = await this.passwordResetService.generateResetToken(email);
      if (!token) {
        res.status(404).json({
          ok: false,
          message: 'El usuario no fue encontrado',
        });
        return;
      }

      await sendPasswordResetEmail(email, token);

      res.status(200).json({
        ok: true,
        message: 'Correo de restablecimiento de contraseña enviado',
      });
    } catch (error) {
      logger.error(`${PasswordResetController.name} - Error en requestPasswordReset: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error enviando el correo de restablecimiento',
      });
    }
  };

  /**
   * resetPassword
   */
  public resetPassword = async (req: Request, res: Response) => {
    try {
      const { token, newPassword } = req.body;
      logger.info(`${PasswordResetController.name} - resetPassword`);

      const result = await this.passwordResetService.resetPassword(token, newPassword);
      if (!result) {
        res.status(400).json({
          ok: false,
          message: 'Token inválido o expirado',
        });
        return;
      }

      res.status(200).json({
        ok: true,
        message: 'Contraseña restablecida correctamente',
      });
    } catch (error) {
      logger.error(`${PasswordResetController.name} - Error en resetPassword: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error restableciendo la contraseña',
      });
    }
  };
}

export default PasswordResetController;
