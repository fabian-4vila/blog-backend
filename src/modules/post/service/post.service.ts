import { Repository, DeleteResult } from 'typeorm';
import { Post } from '../../../entities/Post.entity';
import { AppDataSource } from '../../../config/data.source';
import { CreatePostDto } from '../../../dtos/CreatePostDto';
import { User } from '../../../entities/User.entity';
import uploadService from './upload.service';
import { UpdatePostDto } from '../../../dtos/UpdatePostDto';
import { logger } from '../../../utils/logger';

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
    return await this.postRepository.find();
  }

  /**
   * Get Post By Id
   */
  public async getPostById(id: string): Promise<Post> {
    logger.info(`${PostService.name}-getUserById with id: ${id}`);
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) throw new Error('Post not found');
    return post;
  }

  /**
   * Create Post
   */
  public async createPost(postBody: CreatePostDto, files?: Express.Multer.File[]): Promise<Post> {
    const user = await this.postRepository.manager.findOne(User, { where: { id: postBody.userId }, select: ['id'] });
    if (!user) {
      throw new Error('User not found');
    }
    let uploadedFiles: { type: string; url: string }[] = postBody.files ?? [];
    if (files && files.length > 0) {
      const uploadedFromMulter = await Promise.all(
        files.map(async (file) => {
          const uploaded = await uploadService.uploadFile(file);
          if (!uploaded?.url) {
            throw new Error(`File upload failed for ${file.originalname}`);
          }
          return { type: file.mimetype, url: uploaded.url };
        }),
      );
      uploadedFiles = [...uploadedFiles, ...uploadedFromMulter];
    }
    const newPost = this.postRepository.create({
      title: postBody.title,
      content: postBody.content,
      user,
      files: uploadedFiles,
    });
    return await this.postRepository.save(newPost);
  }

  /**
   * Update Post By Id
   */

  public async updatePostById(id: string, updatePostDto: UpdatePostDto, files?: Express.Multer.File[]): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new Error(`Post con ID ${id} no encontrado.`);
    }
    post.title = updatePostDto.title ?? post.title;
    post.content = updatePostDto.content ?? post.content;
    if (updatePostDto.userId) {
      const user = await this.postRepository.manager.findOne(User, { where: { id: updatePostDto.userId } });
      if (!user) {
        throw new Error(`Usuario con ID ${updatePostDto.userId} no encontrado.`);
      }
      post.user = user;
    }
    post.files = [];
    if (files?.length) {
      const uploadedFiles = await Promise.all(files.map((file) => uploadService.uploadFile(file)));
      post.files = uploadedFiles;
    }
    return this.postRepository.save(post);
  }

  /**
   * Delete Post By Id
   */
  public async deletePostById(id: string): Promise<DeleteResult> {
    const post = await this.getPostById(id);
    if (!post) throw new Error('Post not found');
    return await this.postRepository.delete(id);
  }
}

export default PostService;
