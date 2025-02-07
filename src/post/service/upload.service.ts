import cloudinary from '../../config/cloudinary.config';

class UploadService {
  public async uploadFile(file: Express.Multer.File): Promise<string> {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url; // URL segura de la imagen subida
  }
}

export default new UploadService();
