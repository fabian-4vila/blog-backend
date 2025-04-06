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
     *     summary: Get all users
     *     description: Returns a list of all users. Requires cookie-based authentication.
     *     tags:
     *       - Users
     *     security:
     *       - CookieAuth: []
     *     responses:
     *       200:
     *         description: Successfully retrieved user list.
     *       401:
     *         description: Unauthorized. Token is missing or invalid.
     *       403:
     *         description: Access denied. Admin permissions required.
     *       500:
     *         description: Server error.
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
     *     summary: Get user by ID
     *     description: Returns a specific user by ID. Only accessible to administrators.
     *     tags: [Users]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: User ID
     *     responses:
     *       200:
     *         description: User found.
     *       404:
     *         description: User not found.
     *       401:
     *         description: Unauthorized.
     *       500:
     *         description: Server error.
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
     *     summary: Create a new user
     *     description: Allows an administrator to create a new user.
     *     tags: [Users]
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
     *                 description: Name of the user.
     *               email:
     *                 type: string
     *                 format: email
     *                 description: User's email address.
     *               password:
     *                 type: string
     *                 description: User's password.
     *     responses:
     *       201:
     *         description: User successfully created.
     *       401:
     *         description: Unauthorized.
     *       500:
     *         description: Server error.
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
