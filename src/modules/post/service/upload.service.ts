import cloudinary from '../../../config/cloudinary.config';

class UploadService {
  public async uploadFile(file: Express.Multer.File): Promise<{ type: string; url: string }> {
    const resourceType = file.mimetype.startsWith('image')
      ? 'image'
      : file.mimetype.startsWith('video')
        ? 'video'
        : 'raw';
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: resourceType,
    });
    return {
      type: file.mimetype,
      url: result.secure_url,
    };
  }
}

export default new UploadService();
