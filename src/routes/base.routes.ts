import { Router } from 'express';
import { Routes } from '../interfaces/route.interface';
import { StatusController } from '../modules/status/controller/statusController';

class StatusRoute implements Routes {
  public path: string = '/';
  public router = Router();
  private statusController: StatusController;

  constructor() {
    this.statusController = new StatusController();
    this.initRoutes();
  }

  private initRoutes() {
    /**
     * @swagger
     * /:
     *   get:
     *     summary: Verifica si el servidor está en ejecución.
     *     description: Retorna un estado 200 si el servidor está activo.
     *     tags: [Servidor]
     *     responses:
     *       200:
     *         description: El servidor está en ejecución.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 ok:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: "Running"
     */

    this.router.get(this.path, this.statusController.getStatus.bind(this.statusController));
  }
}

export default StatusRoute;
