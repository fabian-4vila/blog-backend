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
     * /verification/send-email:
     *   post:
     *     summary: Send verification email
     *     description: Sends an email with a link to verify the account.
     *     tags: [Verification]
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
     *         description: Verification email sent successfully.
     *       400:
     *         description: Bad request (invalid data).
     *       500:
     *         description: Server error.
     */
    this.router.post(`${this.path}/send-email`, this.verificationController.sendVerificationEmail);
    /**
     * @swagger
     * /verification/verify/{token}:
     *   get:
     *     summary: Verify email token
     *     description: Verifies the token sent to the user's email.
     *     tags: [Verification]
     *     parameters:
     *       - in: path
     *         name: token
     *         required: true
     *         schema:
     *           type: string
     *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM3NTU4MjIzLTU1NTEtNGY0My1hOGZlLTIzZjgzMDEwYWUzZCIsImlhdCI6MTc0MjYxMjUyMH0.4c1-ZQYp9gT-ZKj0rRvX5xw6wkaxgpCV-1KiX5Eq3W4
     *         description: Verification token sent by email.
     *     responses:
     *       200:
     *         description: Account successfully verified.
     *       400:
     *         description: Invalid or expired token.
     *       500:
     *         description: Server error.
     */
    this.router.get(`${this.path}/verify/:token`, this.verificationController.verifyEmailToken);
  }
}

export default VerificationRoute;
