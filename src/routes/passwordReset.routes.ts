import { Router } from 'express';
import PasswordResetController from '../modules/resetPassword/controller/passwordResetController';

class ResetPasswordRoute {
  public path = '/password-reset';
  public router = Router();
  public passwordReset = new PasswordResetController();

  constructor() {
    this.initRoutes();
  }
  /**
   * @swagger
   * /password-reset/request:
   *   post:
   *     summary: Solicitar restablecimiento de contraseña
   *     description: Enviar una solicitud para restablecer la contraseña. Se envía un correo con un token de restablecimiento.
   *     tags:
   *       - Restablecimiento
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *                 example: usuario@example.com
   *     responses:
   *       200:
   *         description: Se ha enviado un correo con instrucciones para restablecer la contraseña.
   *       400:
   *         description: Falta el correo electrónico o tiene un formato inválido.
   *       500:
   *         description: Error interno del servidor.
   */
  private initRoutes() {
    this.router.post(`${this.path}/request`, this.passwordReset.requestPasswordReset);

    /**
     * @swagger
     * /password-reset/reset/{token}:
     *   post:
     *     summary: Restablecer contraseña
     *     description: Permite al usuario establecer una nueva contraseña utilizando un token válido.
     *     tags:
     *       - Restablecimiento
     *     parameters:
     *       - name: token
     *         in: path
     *         required: true
     *         description: Token de restablecimiento de contraseña proporcionado en el correo.
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               newPassword:
     *                 type: string
     *                 format: password
     *                 example: NuevaContraseña123
     *     responses:
     *       200:
     *         description: Contraseña restablecida con éxito.
     *       400:
     *         description: Falta la nueva contraseña o el token es inválido.
     *       401:
     *         description: Token expirado o inválido.
     *       500:
     *         description: Error interno del servidor.
     */
    this.router.post(`${this.path}/reset/:token`, this.passwordReset.resetPassword);
  }
}
export default ResetPasswordRoute;
