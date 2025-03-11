import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/httpException';
import { HttpResponse } from '../shared/http.response';
import { logger } from '../utils/logger';

const httpResponse = new HttpResponse();

export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, _next: NextFunction): void => {
  let status = 500;
  let message = 'Error occurred on the server';

  if (err instanceof HttpException) {
    status = err.status;
    message = err.message;
  }

  logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}, Error:: ${err.stack}`);

  httpResponse.Error(res, { status, message });
};
