import { logger } from '../../../utils/logger';

export class StatusService {
  constructor() {
    logger.info(`${StatusService.name} - initialized`);
  }

  public getStatus() {
    logger.info(`${StatusService.name} - getStatus`);
    return {
      message: 'Running',
    };
  }
}
