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
     *     summary: Checks if the server is running.
     *     description: Returns a 200 status if the server is active.
     *     tags: [Server]
     *     responses:
     *       200:
     *         description: The server is running.
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
