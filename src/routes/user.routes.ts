import { Router } from 'express';
import UserController from '../modules/user/controllers/UserController';
import { RoleType } from '../types/Role.type';
import UserService from '../modules/user/services/user.service';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';

class UserRoute {
  public path = '/user';
  public router = Router();
  public userController = new UserController();
  public userService = new UserService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      `${this.path}s`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      this.userController.getAllUsers,
    );
    this.router.get(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      this.userController.getUserById,
    );
    this.router.post(`${this.path}`, authenticateJWT, authorizeRoles([RoleType.ADMIN]), this.userController.createUser);
    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      this.userController.updateUserById,
    );
    this.router.patch(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      this.userController.partialUpdateUserById,
    );
    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      this.userController.deleteUserById,
    );
  }
}

export default UserRoute;
