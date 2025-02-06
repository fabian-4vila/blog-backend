import { Repository } from 'typeorm';
import { PostRating } from '../../entities/PostRating.entity';
import { AppDataSource } from '../../config/data.source';
import { logger } from '../../utils/logger';
import { CreatePostRatingDto } from '../../dtos/CreatePostRatingDto';
import { Post } from '../../entities/Post.entity';
import { User } from '../../entities/User.entity';

class PostRatingService {
  private postRatingRepository: Repository<PostRating>;

  constructor() {
    this.postRatingRepository = AppDataSource.getRepository(PostRating);
  }

  /**
   * Get All Posts
   */
  public async getAllPostRatings(): Promise<PostRating[]> {
    logger.info(`${PostRatingService.name}-getAllPostRatings`);
    return this.postRatingRepository.find({ relations: ['post', 'user'] });
  }

  /**
   * Get PostRating By Id
   */
  public async getPostRatingById(id: string): Promise<PostRating | null> {
    logger.info(`${PostRatingService.name}-getPostRatingById with id: ${id}`);
    return this.postRatingRepository.findOne({ where: { id } });
  }

  /**
   * Create postRating
   */
  public async createPostRating(data: CreatePostRatingDto): Promise<PostRating> {
    logger.info(`${PostRatingService.name}-createPostRating`);
    const entityManager = this.postRatingRepository.manager;
    const post = await entityManager.findOne(Post, { where: { id: data.postId } });
    if (!post) {
      throw new Error('Post not found');
    }
    const user = await entityManager.findOne(User, { where: { id: data.userId } });
    if (!user) {
      throw new Error('User not found');
    }
    const newPostRating = this.postRatingRepository.create({
      post,
      user,
      likeDislike: data.likeDislike,
      stars: data.stars,
    });
    return this.postRatingRepository.save(newPostRating);
  }

  /**
   * Update postRating By Id
   */
  public async updatePostRatingById(id: string, updateData: Partial<CreatePostRatingDto>) {
    logger.info(`${PostRatingService.name}-updatePostRatingById with id: ${id}`);
    const postRating = await this.getPostRatingById(id);
    if (!postRating) return null;
    if (updateData.postId) {
      const post = await this.postRatingRepository.manager.findOne(Post, { where: { id: updateData.postId } });
      if (!post) throw new Error('Post not found');
      postRating.post = post;
    }
    if (updateData.userId) {
      const user = await this.postRatingRepository.manager.findOne(User, { where: { id: updateData.userId } });
      if (!user) throw new Error('User not found');
      postRating.user = user;
    }
    Object.assign(postRating, updateData);
    return this.postRatingRepository.save(postRating);
  }

  /**
   * Delete postRating
   */
  public async deletePostRatingById(id: string) {
    logger.info(`${PostRatingService.name}-deletePostRatingById with id: ${id}`);
    const postRatingToDelete = await this.getPostRatingById(id);
    if (!postRatingToDelete) return null;
    await this.postRatingRepository.delete(id);
    return postRatingToDelete;
  }
}

export default PostRatingService;
