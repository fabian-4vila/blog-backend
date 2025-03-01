import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PostRating } from '../../../entities/PostRating.entity';
import { AppDataSource } from '../../../config/data.source';
import { logger } from '../../../utils/logger';
import { CreatePostRatingDto } from '../../../dtos/CreatePostRatingDto';
import { Post } from '../../../entities/Post.entity';
import { User } from '../../../entities/User.entity';
import { UpdatePostRatingDto } from '../../../dtos/UpdatePostRatingDto';

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
    return this.postRatingRepository.find();
  }

  /**
   * Get PostRating By Id
   */
  public async getPostRatingById(id: string): Promise<PostRating> {
    logger.info(`${PostRatingService.name}-getPostRatingById with id: ${id}`);
    const postRating = await this.postRatingRepository.findOne({ where: { id } });
    if (!postRating) throw new Error('Post rating not found');
    return postRating;
  }

  /**
   * Create postRating
   */
  public async createPostRating(data: CreatePostRatingDto): Promise<PostRating> {
    logger.info(`${PostRatingService.name}-createPostRating`);
    const entityManager = this.postRatingRepository.manager;
    const post = await entityManager.findOne(Post, { where: { id: data.postId } });
    if (!post) throw new Error('Post not found');
    const user = await entityManager.findOne(User, { where: { id: data.userId } });
    if (!user) throw new Error('User not found');
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
  public async updatePostRatingById(id: string, updateData: UpdatePostRatingDto): Promise<UpdateResult> {
    logger.info(`${PostRatingService.name}-updatePostRatingById with id: ${id}`);
    const postRating = await this.getPostRatingById(id);
    if (!postRating) throw new Error(`Post Rating with Id ${id} not found`);
    const { postId, userId, ...otherData } = updateData;
    const updatedData: Partial<PostRating> = { ...otherData };
    if (postId) {
      const post = await this.postRatingRepository.manager.findOne(Post, { where: { id: postId } });
      if (!post) throw new Error('Post not found');
      updatedData.post = post;
    }
    if (userId) {
      const user = await this.postRatingRepository.manager.findOne(User, { where: { id: userId } });
      if (!user) throw new Error('User not found');
      updatedData.user = user;
    }
    return await this.postRatingRepository.update(id, updatedData);
  }

  /**
   * Delete postRating By Id
   */
  public async deletePostRatingById(id: string): Promise<DeleteResult> {
    logger.info(`${PostRatingService.name}-deletePostRatingById with id: ${id}`);
    const postRatingToDelete = await this.getPostRatingById(id);
    if (!postRatingToDelete) throw new Error('post rating does not exist');
    return await this.postRatingRepository.delete(id);
  }
}

export default PostRatingService;
