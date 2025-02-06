import { Router } from 'express';
import UserController from '../user/controllers/UserController';

class UserRoute {
  public path = '/user';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}s`, this.userController.getAllUsers);
    this.router.get(`${this.path}/:id`, this.userController.getUserById);
    this.router.post(`${this.path}`, this.userController.createUser);
    this.router.put(`${this.path}/:id`, this.userController.updateUserById);
    this.router.delete(`${this.path}/:id`, this.userController.deleteUserById);
  }
}

export default UserRoute;
