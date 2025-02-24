import { Request, Response } from 'express';
import RegisterService from '../service/register.service';
import { logger } from '../../../utils/logger';
import { HttpResponse } from '../../../shared/http.response';

class RegisterController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  /**
   * registerUser
   */
  public registerUser = async (req: Request, res: Response) => {
    try {
      const { body: userBody } = req;
      logger.info(`${RegisterController.name}-RegisterUser`);
      const newUser = await this.registerService.registerUser(userBody);
      this.httpResponse.Create(res, newUser);
      return;
    } catch (error) {
      logger.error(`${RegisterController.name}- Error in registerUser: ${error}`);
      return this.httpResponse.Error(res, 'Error registering user');
    }
  };
}
export default RegisterController;
