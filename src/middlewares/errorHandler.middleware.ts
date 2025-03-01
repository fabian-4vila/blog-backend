import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, _next: NextFunction): void => {
  logger.error(`[ErrorHandler] Error en la ruta ${req.method} ${req.path}: ${err.message}`);

  res.status(500).json({
    ok: false,
    message: 'Ocurrió un error en el servidor',
    error: err.message,
  });
};
