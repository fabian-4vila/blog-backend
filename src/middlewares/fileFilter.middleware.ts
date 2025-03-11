import { Request, Response, NextFunction } from 'express';

export const fileFilterMiddleware = (req: Request, res: Response, next: NextFunction): void => {
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
      if (!allowedMimeTypes.includes(file.mimetype) || excludedMimeTypes.includes(file.mimetype)) {
        res.status(400).json({
          message: `File format not allowed: ${file.mimetype}. Images, videos and PDFs are allowed. DOCX and TXT files are prohibited.`,
        });
        return;
      }
    }
  }

  next();
};
