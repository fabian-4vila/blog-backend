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
     * tags:
     *   name: Usuarios
     *   description: Endpoints para la gestion de usuarios
     */

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Obtener todos los usuarios
     *     description: Devuelve una lista de todos los usuarios. Requiere autenticación con cookies.
     *     tags:
     *       - Usuarios
     *     security:
     *       - CookieAuth: []  # Usa la cookie para autenticarse
     *     responses:
     *       200:
     *         description: Lista de usuarios obtenida con éxito.
     *       401:
     *         description: No autorizado. Token ausente o inválido.
     */
    this.router.get(
      `${this.path}s`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      this.userController.getAllUsers,
    );
    /**
     * /user/{id}:
     *   get:
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
     *       400:
     *         description: ID inválido.
     *       404:
     *         description: Usuario no encontrado.
     *       401:
     *         description: No autorizado.
     *       403:
     *         description: Prohibido. Se requieren permisos de administrador.
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
     *             properties:
     *               name:
     *                 type: string
     *                 example: "Juan Pérez"
     *               email:
     *                 type: string
     *                 example: "juan@example.com"
     *               password:
     *                 type: string
     *                 example: "password123"
     *               role:
     *                 type: string
     *                 enum: [SUBSCRIBED, ADMIN]
     *                 example: "SUBSCRIBED"
     *     responses:
     *       201:
     *         description: Usuario creado exitosamente.
     *       400:
     *         description: Datos inválidos.
     *       401:
     *         description: No autorizado.
     *       403:
     *         description: Prohibido. Se requieren permisos de administrador.
     *       500:
     *         description: Error en el servidor.
     */
    this.router.post(`${this.path}`, authenticateJWT, authorizeRoles([RoleType.ADMIN]), this.userController.createUser);
    /**
     * @swagger
     * /user/{id}:
     *   put:
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
     *         description: ID del usuario
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: "Juan Pérez"
     *               email:
     *                 type: string
     *                 example: "juan@example.com"
     *               role:
     *                 type: string
     *                 enum: [SUBSCRIBED, ADMIN]
     *                 example: "SUBSCRIBED"
     *     responses:
     *       200:
     *         description: Usuario actualizado correctamente.
     *       400:
     *         description: Datos inválidos.
     *       401:
     *         description: No autorizado.
     *       403:
     *         description: Prohibido. Se requieren permisos de administrador.
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
     *         description: ID del usuario
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: "Juan Pérez"
     *               email:
     *                 type: string
     *                 example: "juan@example.com"
     *               role:
     *                 type: string
     *                 enum: [SUBSCRIBED, ADMIN]
     *                 example: "SUBSCRIBED"
     *     responses:
     *       200:
     *         description: Usuario actualizado correctamente.
     *       400:
     *         description: Datos inválidos.
     *       401:
     *         description: No autorizado.
     *       403:
     *         description: Prohibido. Se requieren permisos de administrador.
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
     *       403:
     *         description: Prohibido. Se requieren permisos de administrador.
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
