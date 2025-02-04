import { Repository } from 'typeorm';
import { Post } from '../../entities/Post.entity';
import { AppDataSource } from '../../config/data.source';
import { logger } from '../../utils/logger';
import { CreatePostDto } from '../../dtos/CreatePostDto';

class PostService {
  private postRepository: Repository<Post>;
  constructor() {
    this.postRepository = AppDataSource.getRepository(Post);
  }

  public async getAllPosts(): Promise<Post[]> {
    logger.info(`${PostService.name}-getAllPosts`);
    return this.postRepository.find({ relations: ['user', 'comment', 'post_rating', 'comment_rating'] });
  }

  public async getPostById(id: string): Promise<Post | null> {
    logger.info(`${PostService.name}-getPostById with id: ${id}`);
    return this.postRepository.findOne({ where: { id } });
  }

  public async createPost(postBody: CreatePostDto): Promise<Post> {
    logger.info(`${PostService.name}-createPost`);
    const newPost = this.postRepository.create(postBody);
    return this.postRepository.save(newPost);
  }

  public async updatePostById(id: string, updatePostBody: Partial<CreatePostDto>) {
    logger.info(`${PostService.name}-updatePostById with id: ${id}`);
    const post = await this.getPostById(id);
    if (!post) return null;
    await this.postRepository.update(id, updatePostBody);
    return this.getPostById(id);
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
