import { Request, Response } from 'express';
import { logger } from '../../../utils/logger';
import UserService from '../services/user.service';
import { instanceToPlain } from 'class-transformer';

class UserController {
  private readonly userService: UserService = new UserService();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  /**
   * Get All Users
   */
  public getAllUsers = async (_req: Request, res: Response) => {
    try {
      logger.info(`${UserController.name} - getAllUser`);
      const users = await this.userService.getAllUser();
      res.status(200).json({
        ok: true,
        users: instanceToPlain(users),
        message: `User list obtained successfully`,
      });
      return;
    } catch (error) {
      logger.error(`${UserController.name}- Error en getAllUsers: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error getting users',
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
        res.status(404).json({
          ok: false,
          message: 'User not found',
        });
        return;
      }
      res.status(200).json({
        ok: true,
        user: instanceToPlain(user),
        message: `User details obtained`,
      });
    } catch (error) {
      logger.error(`${UserController.name}- Error en getUserById: ${error}`);
      res.status(500).json({
        ok: false,
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
      res.status(201).json({
        ok: true,
        user: newuser,
        message: `Successfully created user`,
      });
    } catch (error) {
      logger.error(`${UserController.name}- Error en createUser: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error creating user',
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
      const updateUser = await this.userService.updateUserById(userId, userBody);
      if (!updateUser) {
        res.status(404).json({
          ok: false,
          message: 'User not found',
        });
        return;
      }
      res.status(200).json({
        ok: true,
        user: instanceToPlain(updateUser),
        message: `Successfully updated user`,
      });
    } catch (error) {
      logger.info(`${UserController.name}- Error en updateUserById: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error updating user',
      });
      return;
    }
  };

  /**
   * Update Password By Id
   */
  public updatePassword = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.params;
      const passwordDto = req.body;
      logger.info(`${UserController.name} - updatePassword: ${userId}`);
      const updatedUser = await this.userService.updatePassword(userId, passwordDto);
      if (!updatedUser) {
        res.status(404).json({
          ok: false,
          message: 'User not found',
        });
        return;
      }
      res.status(201).json({
        ok: true,
        user: instanceToPlain(updatedUser),
        message: 'Password Updated successfully',
      });
    } catch (error) {
      logger.error(`${UserController.name}- Error updating password: ${error} `);
      res.status(500).json({
        ok: false,
        message: 'Error updating password',
      });
    }
  };

  /**
   * Delete User By Id
   */
  public deleteUserById = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.params;
      logger.info(`${UserController.name}-deleteUserById: ${userId}`);
      const userDeleted = await this.userService.deleteUserById(userId);
      if (!userDeleted) {
        res.status(404).json({
          ok: false,
          message: 'User not found',
        });
        return;
      }
      res.status(200).json({
        ok: true,
        user: instanceToPlain(userDeleted),
        message: `User deleted successfully`,
      });
    } catch (error) {
      logger.error(`${UserController.name}- Error en deleteUserById: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error deleting user',
      });
      return;
    }
  };
}

export default UserController;
