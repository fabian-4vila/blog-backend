import { Router } from 'express';
import RegisterController from '../modules/register/controller/RegisterController';
import UserService from '../modules/user/services/user.service';
import RegisterService from '../modules/register/service/register.service';
import { HttpResponse } from '../shared/http.response';

class RegisterRoute {
  public path = '/register';
  public router = Router();
  private userService = new UserService();
  private registerService = new RegisterService(this.userService);
  public registerController = new RegisterController(this.registerService, new HttpResponse());
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(`${this.path}`, this.registerController.registerUser);
  }
}

export default RegisterRoute;
