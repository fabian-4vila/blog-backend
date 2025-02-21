import { Request, Response } from 'express';
import { logger } from '../../../utils/logger';
import VerificationService from '../service/verify.service';
import { instanceToPlain } from 'class-transformer';

class VerificationController {
  private readonly verificationService: VerificationService = new VerificationService();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  /**
   * Send Verification Email
   */
  public sendVerificationEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      logger.info(`${VerificationController.name} - sendVerificationEmail to: ${email}`);

      await this.verificationService.sendVerificationEmail(email);

      res.status(200).json({
        ok: true,
        message: 'Verification email sent successfully',
      });
    } catch (error) {
      logger.error(`${VerificationController.name} - Error in sendVerificationEmail: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error sending verification email',
      });
    }
  };

  /**
   * Verify Email Token
   */
  public verifyEmailToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      logger.info(`${VerificationController.name} - verifyEmailToken: ${token}`);

      const verifiedUser = await this.verificationService.verifyEmailToken(token);

      if (!verifiedUser) {
        res.status(400).json({
          ok: false,
          message: 'Invalid or expired verification token',
        });
        return;
      }

      res.status(200).json({
        ok: true,
        user: instanceToPlain(verifiedUser),
        message: 'Email verified successfully',
      });
    } catch (error) {
      logger.error(`${VerificationController.name} - Error in verifyEmailToken: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error verifying email token',
      });
    }
  };
}

export default VerificationController;
