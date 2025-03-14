import { Request, Response } from 'express';
import { logger } from '../../../utils/logger';
import UserService from '../services/user.service';
import { instanceToPlain } from 'class-transformer';
import { HttpResponse } from '../../../shared/http.response';
import { DeleteResult, UpdateResult } from 'typeorm';

class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  /**
   * Get All Users
   */
  public getAllUsers = async (_req: Request, res: Response) => {
    try {
      logger.info(`${UserController.name} - getAllUsers`);
      const users = await this.userService.getAllUser();
      this.httpResponse.Ok(res, {
        user: instanceToPlain(users),
      });
      return;
    } catch (error) {
      logger.error(`${UserController.name}- Error en getAllUsers: ${error}`);
      this.httpResponse.Error(res, {
        message: 'Error getting user',
      });
      return;
    }
  };

  /**
   * Get User By Id
   */
  public getUserById = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.params;
      logger.info(`${UserController.name} - getUserById: ${userId}`);
      const user = await this.userService.getUserById(userId);
      if (!user) {
        this.httpResponse.NotFound(res, {
          message: 'User does not exist',
        });
        return;
      }
      this.httpResponse.Ok(res, {
        user: instanceToPlain(user),
      });
      return;
    } catch (error) {
      logger.error(`${UserController.name}- Error en getUserById: ${error}`);
      this.httpResponse.Error(res, {
        message: 'Error getting user',
      });
      return;
    }
  };

  /**
   * Create User
   */
  public createUser = async (req: Request, res: Response) => {
    try {
      const { body: userBody } = req;
      logger.info(`${UserController.name} - CreateUser`);
      const newuser = await this.userService.createUser(userBody);
      this.httpResponse.Create(res, {
        user: instanceToPlain(newuser),
      });
      return;
    } catch (error) {
      logger.error(`${UserController.name}- Error en createUser: ${error}`);
      this.httpResponse.Error(res, {
        message: 'Error creating user',
      });
      return;
    }
  };
  /**
   * partial Update User By Id
   */
  public partialUpdateUserById = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.params;
      const { body: partialUserBody } = req;
      logger.info(`${UserController.name} - partialUpdateUserById: ${userId}`);

      const partialUpdateUser: UpdateResult = await this.userService.partialUpdateUserById(userId, partialUserBody);

      if (!partialUpdateUser.affected) {
        this.httpResponse.NotFound(res, {
          message: 'User does not exist',
        });
        return;
      }
      this.httpResponse.Ok(res, partialUpdateUser);
      return;
    } catch (error) {
      logger.error(`${UserController.name} - Error en partialUpdateUserById: ${error}`);
      this.httpResponse.Error(res, {
        message: 'Error Updating user',
      });
      return;
    }
  };

  /**
   * Update User By Id
   */
  public updateUserById = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.params;
      const { body: userBody } = req;
      logger.info(`${UserController.name} - updateUserById: ${userId}`);
      const updateUser: UpdateResult = await this.userService.updateUserById(userId, userBody);
      if (!updateUser.affected) {
        this.httpResponse.NotFound(res, {
          message: 'User does not exist',
        });
        return;
      }
      this.httpResponse.Ok(res, updateUser);
      return;
    } catch (error) {
      logger.info(`${UserController.name}- Error en updateUserById: ${error}`);
      this.httpResponse.Error(res, {
        message: 'Error Updating user',
      });
      return;
    }
  };

  /**
   * Delete User By Id
   */
  public deleteUserById = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.params;
      logger.info(`${UserController.name}-deleteUserById: ${userId}`);
      const userDeleted: DeleteResult = await this.userService.deleteUserById(userId);
      if (!userDeleted.affected) {
        this.httpResponse.NotFound(res, {
          message: 'User does not exist',
        });
        return;
      }
      this.httpResponse.Ok(res, userDeleted);
      return;
    } catch (error) {
      logger.error(`${UserController.name}- Error en deleteUserById: ${error}`);
      this.httpResponse.Error(res, {
        message: 'Error deleting user',
      });
      return;
    }
  };
}

export default UserController;
