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
     *     summary: Registrar un nuevo usuario
     *     description: Permite a un usuario crear una cuenta en el sistema.
     *     tags: [Autenticación]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Nombre del usuario.
     *               email:
     *                 type: string
     *                 format: email
     *                 description: Correo electrónico del usuario.
     *               password:
     *                 type: string
     *                 description: Contraseña del usuario.
     *     responses:
     *       201:
     *         description: Usuario registrado exitosamente.
     *       400:
     *         description: Datos inválidos o usuario ya registrado.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.post(`${this.path}`, this.registerController.registerUser);
  }
}

export default RegisterRoute;
