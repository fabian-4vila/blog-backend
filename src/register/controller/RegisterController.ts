import { Request, Response } from 'express';
import RegisterService from '../service/register.service';
import { logger } from '../../utils/logger';
import UserService from '../../user/services/user.service';

class RegisterController {
  private readonly registerService: RegisterService;

  constructor() {
    const userService = new UserService(); // ✅ Crea una instancia de UserService
    this.registerService = new RegisterService(userService);
  }

  /**
   * registerUser
   */
  public registerUser = async (req: Request, res: Response) => {
    try {
      const { body: userBody } = req;
      logger.info(`${RegisterController.name}-RegisterUser`);
      const newUser = await this.registerService.registerUser(userBody);
      res.status(201).json({
        ok: true,
        user: newUser,
        message: 'User registered successfully',
      });
    } catch (error) {
      logger.error(`${RegisterController.name}- Error in registerUser: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error registering user',
      });
    }
  };
}
export default RegisterController;
