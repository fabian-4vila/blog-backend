import { Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class HttpResponse {
  Ok(res: Response, data: any) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      statusMesage: ReasonPhrases.OK,
      data,
    });
  }
  Create(res: Response, data: any) {
    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      statusMesage: ReasonPhrases.CREATED,
      data,
    });
  }
  NotFound(res: Response, data: any) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: StatusCodes.NOT_FOUND,
      statusMesage: ReasonPhrases.NOT_FOUND,
      data,
    });
  }
  Unauthorized(res: Response, data: any) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      statusMesage: ReasonPhrases.UNAUTHORIZED,
      data,
    });
  }
  Forbiden(res: Response, data: any) {
    return res.status(StatusCodes.FORBIDDEN).json({
      status: StatusCodes.FORBIDDEN,
      statusMesage: ReasonPhrases.FORBIDDEN,
      data,
    });
  }
  BadRequest(res: Response, data: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      statusMesage: ReasonPhrases.BAD_REQUEST,
      data,
    });
  }
  Error(res: Response, data: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusMesage: ReasonPhrases.INTERNAL_SERVER_ERROR,
      data,
    });
  }
}
