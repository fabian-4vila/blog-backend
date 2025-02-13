import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.config';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    const allowedFormats = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'mp4', 'mov', 'avi', 'mkv'];

    const ext = file.mimetype.split('/')[1];
    if (!allowedFormats.includes(ext)) {
      throw new Error('Type of file not allowed');
    }

    return {
      folder: 'uploads',
      format: ext,
      resource_type:
        ext === 'pdf' || ext === 'mp4' || ext === 'mov' || ext === 'avi' || ext === 'mkv' ? 'video' : 'image',
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });

export default upload;
