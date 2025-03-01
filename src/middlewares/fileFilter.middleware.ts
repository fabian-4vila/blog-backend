import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const fileFilterMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  logger.info('[Middleware] Iniciando validación de tipos de archivos');

  const allowedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-matroska',
  ];

  const excludedMimeTypes = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
    'text/plain', // txt
  ];

  const files = req.files as Express.Multer.File[] | undefined;

  if (files?.length) {
    for (const file of files) {
      logger.info(`[Middleware] Validando archivo: ${file.originalname} - Tipo: ${file.mimetype}`);
      if (!allowedMimeTypes.includes(file.mimetype) || excludedMimeTypes.includes(file.mimetype)) {
        logger.warn(`[Middleware] Formato de archivo no permitido: ${file.mimetype}`);
        res.status(400).json({
          message: `Formato de archivo no permitido: ${file.mimetype}. Se permiten imágenes, videos y PDFs. Archivos DOCX y TXT están prohibidos.`,
        });
        return;
      }
    }
    logger.info('[Middleware] Todos los archivos tienen un formato permitido');
    next();
  } else {
    logger.warn('[Middleware] No se recibieron archivos en la solicitud');
    res.status(400).json({
      message: 'No se recibieron archivos en la solicitud. Por favor, sube al menos un archivo.',
    });
  }
};
