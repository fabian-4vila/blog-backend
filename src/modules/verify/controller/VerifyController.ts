import { Request, Response } from 'express';
import VerifyService from '../service/verify.service';
import { logger } from '../../../utils/logger';
import UserService from '../../user/services/user.service';

class VerifyController {
  private readonly verifyService: VerifyService;

  constructor() {
    const userService = new UserService();
    this.verifyService = new VerifyService(userService);
  }

  public verifyEmail = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      logger.info(`${VerifyController.name}-verifyEmail`);

      const result = await this.verifyService.verifyEmail(token);

      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(400).json({ message: result.message });
      }
    } catch (error) {
      logger.error(`${VerifyController.name}- Error in verifyEmail: ${error}`);
      res.status(500).json({ message: 'Error verificando el usuario' });
    }
  };
}

export default VerifyController;
