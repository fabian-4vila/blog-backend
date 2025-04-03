import { Request, Response } from 'express';
import { StatusService } from '../service/status.service';
import { HttpResponse } from '../../../shared/http.response';

export class StatusController {
  private statusService: StatusService;
  private httpResponse: HttpResponse;

  constructor() {
    this.statusService = new StatusService();
    this.httpResponse = new HttpResponse();
  }

  getStatus(_req: Request, res: Response) {
    try {
      const status = this.statusService.getStatus();
      this.httpResponse.Ok(res, status);
    } catch (error) {
      this.httpResponse.Error(res, { message: 'Error getting status' });
    }
  }
}
