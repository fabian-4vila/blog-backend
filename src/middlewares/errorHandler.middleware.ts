import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../shared/http.response';

const httpResponse = new HttpResponse();
export const errorHandlerMiddleware = (_err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  httpResponse.Error(res, {
    message: 'Ocurrió un error en el servidor',
  });
};
