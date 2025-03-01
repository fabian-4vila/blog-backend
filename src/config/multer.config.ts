import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.config';

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

const fileFilter = (_req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Formato de archivo no permitido: ${file.mimetype}`));
  }
};
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    try {
      const ext = file.mimetype.split('/')[1];
      const resourceType = ['mp4', 'mov', 'avi', 'mkv'].includes(ext) ? 'video' : ext === 'pdf' ? 'raw' : 'image';
      const publicId = `${Date.now()}-${file.originalname}`;
      return {
        folder: 'uploads',
        format: ext,
        resource_type: resourceType,
        public_id: publicId,
      };
    } catch (error) {
      throw error;
    }
  },
});
const upload = multer({
  storage,
  limits: { files: 5 },
  fileFilter,
});

export default upload;
