import { Router } from 'express';
import VerificationController from '../modules/verify/controller/verifyController';

class VerificationRoute {
  public path = '/verification';
  public router = Router();
  public verificationController = new VerificationController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    /**
     * @swagger
     * tags:
     *   name: Verificacion
     *   description: Endpoints para envio de correo de verificacion
     */

    /**
     * @swagger
     * /verification/send-email:
     *   post:
     *     summary: Enviar correo de verificacion
     *     description: Envia un correo electronico con un enlace para verificar la cuenta
     *     tags:
     *       - Verificacion
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *             properties:
     *               email:
     *                 type: string
     *                 example: marcos@gmail.com
     *     responses:
     *       200:
     *         description: Correo de verificacion enviado exitosamente.
     *       400:
     *         description: Error en la solicitud (datos invalidos).
     *       500:
     *         description: Error en el servidor.
     */
    this.router.post(`${this.path}/send-email`, this.verificationController.sendVerificationEmail);
    /**
     * @swagger
     * /verification/verify/{token}:
     *   get:
     *     summary: Verificar token de correo electronico
     *     description: Verifica el token enviado al correo electronico del usuario.
     *     tags:
     *       - Verificacion
     *     parameters:
     *       - in: path
     *         name: token
     *         required: true
     *         schema:
     *           type: string
     *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM3NTU4MjIzLTU1NTEtNGY0My1hOGZlLTIzZjgzMDEwYWUzZCIsImlhdCI6MTc0MjYxMjUyMH0.4c1-ZQYp9gT-ZKj0rRvX5xw6wkaxgpCV-1KiX5Eq3W4
     *         description: Token de verificacion enciado por correo.
     *     responses:
     *       200:
     *         description: Cuenta verificada exitosamente.
     *       400:
     *         description: Token invalido o expirado.
     *       500:
     *         descruption: Error en el servidor.
     */
    this.router.get(`${this.path}/verify/:token`, this.verificationController.verifyEmailToken);
  }
}

export default VerificationRoute;
