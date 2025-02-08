import cloudinary from '../../config/cloudinary.config';
/**
 * Upload File
 */
class UploadService {
  public async uploadFile(file: Express.Multer.File): Promise<{ type: string; url: string }> {
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: 'auto', // Detecta automáticamente el tipo de archivo
    });
    return {
      type: file.mimetype, // Tipo del archivo (ej. image/png, application/pdf, video/mp4)
      url: result.secure_url, // URL del archivo en Cloudinary
    };
  }
}

export default new UploadService();
