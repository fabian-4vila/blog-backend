import { Request, Response, Router } from 'express';
import { Routes } from '../interfaces/route.interface';

class BaseRoute implements Routes {
  public path?: string = '/alive';
  public router = Router();
  constructor() {
    this.initBaseRoutes();
  }
  //initBaseRoutes
  public initBaseRoutes() {
    /**
     * @swagger
     * /alive:
     *   get:
     *     summary: Verifica si el servidor está en ejecución.
     *     description: Retorna un estado 200 si el servidor está activo.
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

    this.router.get(`${this.path}`, (_req: Request, res: Response) => {
      res.status(200).json({
        ok: true,
        message: `Runnig`,
      });
    });
  }
}

export default BaseRoute;
