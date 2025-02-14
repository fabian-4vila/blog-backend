import cloudinary from '../../config/cloudinary.config';
/**
 * Upload File
 */
class UploadService {
  public async uploadFile(file: Express.Multer.File): Promise<{ type: string; url: string }> {
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: 'auto',
    });
    return {
      type: file.mimetype,
      url: result.secure_url,
    };
  }
}

export default new UploadService();
