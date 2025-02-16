import { Router } from 'express';
import UserController from '../modules/user/controllers/UserController';
import { authenticateJWT, authorizeOwnerOrRoles, authorizeRoles } from '../middlewares/auth.middleware';
import { RoleType } from '../types/Role.type';
import UserService from '../modules/user/services/user.service';

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
    this.router.get(`${this.path}/:id`, authenticateJWT, this.userController.getUserById);
    this.router.post(`${this.path}`, authenticateJWT, authorizeRoles([RoleType.ADMIN]), this.userController.createUser);
    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeOwnerOrRoles([RoleType.ADMIN], async (id: string) => {
        const user = await this.userService.getUserById(id);
        return user ? { ownerId: user.id } : null;
      }),
      this.userController.updateUserById,
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
