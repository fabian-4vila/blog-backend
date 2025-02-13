import { Repository } from 'typeorm';
import { Post } from '../../entities/Post.entity';
import { AppDataSource } from '../../config/data.source';
import { logger } from '../../utils/logger';
import { CreatePostDto } from '../../dtos/CreatePostDto';
import { User } from '../../entities/User.entity';
import uploadService from './upload.service';

class PostService {
  private postRepository: Repository<Post>;
  constructor() {
    this.postRepository = AppDataSource.getRepository(Post);
  }
  /**
   * Get All Posts
   */
  public async getAllPosts(): Promise<Post[]> {
    logger.info(`${PostService.name}-getAllPosts`);
    return this.postRepository.find();
  }
  /**
   * Get Post By Id
   */
  public async getPostById(id: string): Promise<Post | null> {
    logger.info(`${PostService.name}-getPostById with id: ${id}`);
    return this.postRepository.findOne({ where: { id } });
  }
  /**
   * Create Post
   */
  public async createPost(postBody: CreatePostDto, files?: Express.Multer.File[]): Promise<Post> {
    logger.info(`${PostService.name} - createPost`);
    const user = await this.postRepository.manager.findOne(User, { where: { id: postBody.userId } });
    if (!user) throw new Error('User not found');
    let uploadedFiles: { type: string; url: string }[] = postBody.files || [];
    if (files && files.length > 0) {
      try {
        const uploadedFromMulter = await Promise.all(
          files.map(async (file) => {
            const uploaded = await uploadService.uploadFile(file);
            return { type: file.mimetype, url: uploaded.url };
          }),
        );
        uploadedFiles = [...uploadedFiles, ...uploadedFromMulter];
      } catch (error) {
        logger.error(`${PostService.name} - Error uploading files: ${error}`);
        throw new Error('Error processing files');
      }
    }
    const newPost = this.postRepository.create({
      title: postBody.title,
      content: postBody.content,
      user: user,
      files: uploadedFiles.length > 0 ? uploadedFiles : [],
    });
    try {
      const savedPost = await this.postRepository.save(newPost);
      logger.info(`${PostService.name} - Post creado con ID: ${savedPost.id}`);
      return savedPost;
    } catch (error) {
      logger.error(`${PostService.name} - Error saving post: ${error}`);
      throw new Error('Error saving post to database');
    }
  }
  /**
   * Update Post By Id
   */
  public async updatePostById(id: string, updatePostBody: Partial<CreatePostDto>, files?: Express.Multer.File[]) {
    logger.info(`${PostService.name}-updatePostById with id: ${id}`);
    const post = await this.getPostById(id);
    if (!post) return null;
    if (updatePostBody.userId) {
      const user = await this.postRepository.manager.findOne(User, { where: { id: updatePostBody.userId } });
      if (!user) throw new Error('user not found');
      post.user = user;
    }
    if (files && files.length > 0) {
      const uploadedFiles = files
        ? await Promise.all(
            files.map(async (file) => {
              const uploaded = await uploadService.uploadFile(file);
              return { type: file.mimetype, url: uploaded.url };
            }),
          )
        : [];
      post.files = post.files ? [...post.files, ...uploadedFiles] : uploadedFiles;
    }
    Object.assign(post, updatePostBody);
    return this.postRepository.save(post);
  }
  /**
   * Delete Post
   */
  public async deletePostById(id: string) {
    logger.info(`${PostService.name}-deletePostById with id: ${id}`);
    const postToDelete = await this.getPostById(id);
    if (!postToDelete) return null;
    await this.postRepository.delete(id);
    return postToDelete;
  }
}

export default PostService;
