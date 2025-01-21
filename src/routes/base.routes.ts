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
    this.router.get(`${this.path}`, (_req: Request, res: Response) => {
      res.status(200).json({
        ok: true,
        message: `soy una api y estoy viva`,
      });
    });
  }
}

export default BaseRoute;
