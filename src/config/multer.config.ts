import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.config';
import path from 'path';
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req: Request, file: Express.Multer.File) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'mov', 'avi', 'mkv', 'webm', 'pdf'];
    const ext = path.extname(file.originalname).substring(1).toLowerCase();
    if (!ext || !allowedExtensions.includes(ext)) {
      throw new Error(`Tipo de archivo no permitido: .${ext}`);
    }

    return {
      folder: 'uploads',
      format: ext,
      resource_type: ['mp4', 'mov', 'avi', 'mkv', 'webm'].includes(ext) ? 'video' : ext === 'pdf' ? 'raw' : 'image',
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'mov', 'avi', 'mkv', 'webm', 'pdf'];

  const ext = path.extname(file.originalname).substring(1).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. solo se permiten imagenes, videos y pdf'));
  }
};

const upload = multer({ storage, fileFilter });
export default upload;
