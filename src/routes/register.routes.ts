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
    /**
     * @swagger
     * /register:
     *   post:
     *     summary: Register a new user
     *     description: Allows a user to create an account in the system.
     *     tags: [Registration]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: User's name.
     *               email:
     *                 type: string
     *                 format: email
     *                 description: User's email address.
     *               password:
     *                 type: string
     *                 description: User's password.
     *     responses:
     *       201:
     *         description: User successfully registered.
     *       400:
     *         description: Invalid data or user already registered.
     *       500:
     *         description: Server error.
     */
    this.router.post(`${this.path}`, this.registerController.registerUser);
  }
}

export default RegisterRoute;
