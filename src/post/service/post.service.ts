import { Repository } from 'typeorm';
import { Post } from '../../entities/Post.entity';
import { AppDataSource } from '../../config/data.source';
import { logger } from '../../utils/logger';
import { CreatePostDto } from '../../dtos/CreatePostDto';
import { User } from '../../entities/User.entity';

class PostService {
  private postRepository: Repository<Post>;
  constructor() {
    this.postRepository = AppDataSource.getRepository(Post);
  }

  public async getAllPosts(): Promise<Post[]> {
    logger.info(`${PostService.name}-getAllPosts`);
    return this.postRepository.find({ relations: ['user'] });
  }

  public async getPostById(id: string): Promise<Post | null> {
    logger.info(`${PostService.name}-getPostById with id: ${id}`);
    return this.postRepository.findOne({ where: { id } });
  }

  public async createPost(postBody: CreatePostDto): Promise<Post> {
    logger.info(`${PostService.name}-createPost`);
    const user = await this.postRepository.manager.findOne(User, { where: { id: postBody.userId } });
    if (!user) {
      throw new Error('User not found');
    }
    const newPost = this.postRepository.create({
      ...postBody,
      user,
    });
    return this.postRepository.save(newPost);
  }

  public async updatePostById(id: string, updatePostBody: Partial<CreatePostDto>) {
    logger.info(`${PostService.name}-updatePostById with id: ${id}`);
    const post = await this.getPostById(id);
    if (!post) return null;
    if (updatePostBody.userId) {
      const user = await this.postRepository.manager.findOne(User, { where: { id: updatePostBody.userId } });
      if (!user) throw new Error('El usuario no existe');
      post.user = user;
    }
    Object.assign(post, updatePostBody);
    return this.postRepository.save(post);
  }

  public async deletePostById(id: string) {
    logger.info(`${PostService.name}-deletePostById with id: ${id}`);
    const postToDelete = await this.getPostById(id);
    if (!postToDelete) return null;
    await this.postRepository.delete(id);
    return postToDelete;
  }
}

export default PostService;
