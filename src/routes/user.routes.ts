import { Router } from 'express';
import UserController from '../user/controllers/UserController';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';
import { RoleType } from '../types/Role.type';

class UserRoute {
  public path = '/user';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}s`, authenticateJWT, authorizeRoles(RoleType.ADMIN), this.userController.getAllUsers);
    this.router.get(`${this.path}/:id`, authenticateJWT, this.userController.getUserById);
    this.router.post(`${this.path}`, this.userController.createUser);
    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles(RoleType.ADMIN),
      this.userController.updateUserById, //revisar si esto necesita roll
    );
    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles(RoleType.ADMIN),
      this.userController.deleteUserById,
    );
  }
}

export default UserRoute;
