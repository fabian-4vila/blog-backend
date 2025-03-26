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
    /**
     * @swagger
     * /users:
     *   get:
     *     operationId: "1_getAllUser"
     *     summary: Obtener todos los usuarios
     *     description: Devuelve una lista de todos los usuarios. Requiere autenticación con cookies.
     *     tags:
     *       - Usuarios
     *     security:
     *       - CookieAuth: []
     *     responses:
     *       200:
     *         description: Lista de usuarios obtenida con éxito.
     *       401:
     *         description: No autorizado. Token ausente o inválido.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.get(
      `${this.path}s`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      this.userController.getAllUsers,
    );
    /**
     * @swagger
     * /user/{id}:
     *   get:
     *     operationId: "2_getUserById"
     *     summary: Obtener un usuario por ID
     *     description: Devuelve un usuario especifico segun su ID. solo accesible para administradores.
     *     tags: [Usuarios]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del usuario
     *     responses:
     *       200:
     *         description: Usuario encontrado.
     *       404:
     *         description: Usuario no encontrado.
     *       401:
     *         description: No autorizado.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.get(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      this.userController.getUserById,
    );
    /**
     * @swagger
     * /user:
     *   post:
     *     operationId: "3_createUser"
     *     summary: Crear un nuevo usuario
     *     description: Permite a un administrador crear un nuevo usuario.
     *     tags: [Usuarios]
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - email
     *               - password
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
     *         description: Usuario creado exitosamente.
     *       401:
     *         description: No autorizado.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.post(`${this.path}`, authenticateJWT, authorizeRoles([RoleType.ADMIN]), this.userController.createUser);
    /**
     * @swagger
     * /user/{id}:
     *   put:
     *     operationId: "4_updateUser"
     *     summary: Actualizar un usuario
     *     description: Permite a un administrador actualizar los datos de un usuario.
     *     tags: [Usuarios]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del usuario a actualizar.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Nuevo nombre del usuario.
     *               email:
     *                 type: string
     *                 format: email
     *                 description: Nuevo correo electrónico del usuario.
     *               password:
     *                 type: string
     *                 description: Nueva contraseña del usuario.
     *     responses:
     *       200:
     *         description: Usuario actualizado correctamente.
     *       401:
     *         description: No autorizado.
     *       404:
     *         description: Usuario no encontrado.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      this.userController.updateUserById,
    );
    /**
     * @swagger
     * /user/{id}:
     *   patch:
     *     operationId: "5_partialUpdateUser"
     *     summary: Actualización parcial de un usuario
     *     description: Permite a un administrador actualizar parcialmente los datos de un usuario.
     *     tags: [Usuarios]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del usuario.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Nuevo nombre del usuario (opcional).
     *               email:
     *                 type: string
     *                 format: email
     *                 description: Nuevo correo electrónico del usuario (opcional).
     *               password:
     *                 type: string
     *                 description: Nueva contraseña del usuario (opcional).
     *     responses:
     *       200:
     *         description: Usuario actualizado correctamente.
     *       401:
     *         description: No autorizado.
     *       404:
     *         description: Usuario no encontrado.
     *       500:
     *         description: Error en el servidor.
     */

    this.router.patch(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      this.userController.partialUpdateUserById,
    );
    /**
     * @swagger
     * /user/{id}:
     *   delete:
     *     operationId: "6_deleteUser"
     *     summary: Eliminar un usuario
     *     description: Permite a un administrador eliminar un usuario.
     *     tags: [Usuarios]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID del usuario
     *     responses:
     *       200:
     *         description: Usuario eliminado correctamente.
     *       401:
     *         description: No autorizado.
     *       404:
     *         description: Usuario no encontrado.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      this.userController.deleteUserById,
    );
  }
}

export default UserRoute;
