import { Request, Response } from 'express';

import { logger } from '../../utils/logger';
import UserService from '../services/user.service';

class UserController {
  private readonly userService: UserService = new UserService();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  /**
   * getAllUsers
   */
  public getAllUsers = async (_req: Request, res: Response) => {
    try {
      logger.info(`${UserController.name}-getAllUser`);
      const users = await this.userService.getAllUser();
      res.json({
        ok: true,
        users: users,
        message: `User list obtained successfully`,
      });
    } catch (error) {
      logger.error(`${UserController.name}-getAllUser`);
      res.status(500).json({ ok: false, message: 'Error obteniendo usuarios' });
    }
  };

  /**
   * getUserById
   * */
  public getUserById = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.params;
      logger.info(`${UserController.name}-getUserById`);
      const user = await this.userService.getUserById(userId);
      if (!user) {
        res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
      }
      res.status(200).json({
        ok: true,
        user,
        message: `Detalles de usuario `,
      });
    } catch (error) {
      logger.error(`${UserController.name}-getUserById`);
      res.status(500).json({ ok: false, message: 'Error obteniendo usuario' });
    }
  };

  /**
   * createUser
   * */
  public createUser = async (req: Request, res: Response) => {
    try {
      const { body: userBody } = req;
      logger.info(`${UserController.name}-CreateUser`);
      const newuser = await this.userService.createUser(userBody);
      res.status(200).json({
        ok: true,
        user: newuser,
        message: `Usuario creado `,
      });
    } catch (error) {
      logger.error(`${UserController.name}-CreateUser`);
      res.status(500).json({ ok: false, message: 'Error creando usuario' });
    }
  };

  /**
   * updateUserById
   */
  public updateUserById = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.params;
      const { body: userBody } = req;
      logger.info(`${UserController.name}-updateUserById`);
      const updateUser = await this.userService.UpdateUserById(userId, userBody);
      if (!updateUser) {
        res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
      }
      res.status(200).json({
        ok: true,
        user: updateUser,
        message: `Usuario actualizado `,
      });
    } catch (error) {
      logger.info(`${UserController.name}-updateUserById`);
      res.status(500).json({ ok: false, message: 'Error actualizando usuario' });
    }
  };
  /**
   * deleteUserById
   */
  public deleteUserById = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.params;
      logger.info(`${UserController.name}-deleteUserById`);
      const userDeleted = await this.userService.deleteUserById(userId);
      res.status(200).json({
        ok: true,
        user: userDeleted,
        message: `Usuario borrado`,
      });
    } catch (error) {
      logger.error(`${UserController.name}-deleteUserById`);
      res.status(500).json({ ok: false, message: 'Error eliminando usuario' });
    }
  };
}

export default UserController;
