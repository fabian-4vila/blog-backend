import { Request, Response } from 'express';
import { logger } from '../../../utils/logger';
import UserService from '../services/user.service';
//import { instanceToPlain } from 'class-transformer';
import { HttpResponse } from '../../../shared/response/http.response';
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
      logger.info(`${UserController.name} - getAllUser`);
      const users = await this.userService.getAllUser();
      return this.httpResponse.Ok(res, users);
    } catch (error) {
      logger.error(`${UserController.name}- Error en getAllUsers: ${error}`);
      return this.httpResponse.Error(res, 'error server side');
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
        return this.httpResponse.NotFound(res, 'user does not exist');
      }
      return this.httpResponse.Ok(res, user);
    } catch (error) {
      logger.error(`${UserController.name}- Error en getUserById: ${error}`);
      return this.httpResponse.Error(res, 'error server side');
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
      return this.httpResponse.Create(res, newuser);
    } catch (error) {
      logger.error(`${UserController.name}- Error en createUser: ${error}`);
      return this.httpResponse.Error(res, 'error server side');
    }
  };
  // hacer el patch en el service ya existe.
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
        return this.httpResponse.NotFound(res, 'user does not exist');
      }
      return this.httpResponse.Ok(res, updateUser);
    } catch (error) {
      logger.info(`${UserController.name}- Error en updateUserById: ${error}`);
      return this.httpResponse.Error(res, 'error server side');
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
        return this.httpResponse.Error(res, 'error server side');
      }
      return this.httpResponse.Ok(res, userDeleted);
    } catch (error) {
      logger.error(`${UserController.name}- Error en deleteUserById: ${error}`);
      return this.httpResponse.Error(res, 'error server side');
    }
  };
}

export default UserController;
