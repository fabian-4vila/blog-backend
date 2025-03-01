import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export const handleMulterError = (err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    // Errores específicos de Multer (por ejemplo, límite de archivos)
    res.status(400).json({ message: 'Error al subir el archivo: ' + err.message });
    return;
  } else if (err) {
    // Errores personalizados (por ejemplo, tipo de archivo no permitido)
    res.status(400).json({ message: err.message });
    return;
  }
  next();
};
