import { Request, Response } from 'express';
import { logger } from '../../../utils/logger';
import VerificationService from '../service/verify.service';
import { HttpResponse } from '../../../shared/http.response';
import { instanceToPlain } from 'class-transformer';

class VerificationController {
  constructor(
    private readonly verificationService: VerificationService = new VerificationService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  /**
   * Send Verification Email
   */
  public sendVerificationEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      logger.info(`${VerificationController.name} - sendVerificationEmail to: ${email}`);
      await this.verificationService.sendVerificationEmail(email);
      this.httpResponse.Ok(res, 'Verification email sent successfully');
    } catch (error) {
      logger.error(`${VerificationController.name} - Error in sendVerificationEmail: ${error}`);
      this.httpResponse.Error(res, 'Error sending verification email');
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
        this.httpResponse.Error(res, 'Invalid or expired verification token');
        return;
      }
      this.httpResponse.Ok(res, {
        user: instanceToPlain(verifiedUser),
        message: 'Email verified successfully',
      });
    } catch (error) {
      logger.error(`${VerificationController.name} - Error in verifyEmailToken: ${error}`);
      this.httpResponse.Error(res, 'Error verifying email token');
    }
  };
}

export default VerificationController;
