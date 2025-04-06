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
     *     summary: Update a user
     *     description: Allows an administrator to update a user's data.
     *     tags: [Users]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID of the user to update.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: New name of the user.
     *               email:
     *                 type: string
     *                 format: email
     *                 description: New email of the user.
     *               password:
     *                 type: string
     *                 description: New password of the user.
     *     responses:
     *       200:
     *         description: User successfully updated.
     *       401:
     *         description: Unauthorized.
     *       404:
     *         description: User not found.
     *       500:
     *         description: Server error.
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
     *     summary: Partially update a user
     *     description: Allows an administrator to partially update a user's data.
     *     tags: [Users]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: User ID.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: New name of the user (optional).
     *               email:
     *                 type: string
     *                 format: email
     *                 description: New email of the user (optional).
     *               password:
     *                 type: string
     *                 description: New password of the user (optional).
     *     responses:
     *       200:
     *         description: User successfully updated.
     *       401:
     *         description: Unauthorized.
     *       404:
     *         description: User not found.
     *       500:
     *         description: Server error.
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
     *     summary: Delete a user
     *     description: Allows an administrator to delete a user.
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
     *         description: User successfully deleted.
     *       401:
     *         description: Unauthorized.
     *       404:
     *         description: User not found.
     *       500:
     *         description: Server error.
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
