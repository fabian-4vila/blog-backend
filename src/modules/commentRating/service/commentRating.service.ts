import { Repository } from 'typeorm';
import { CommentRating } from '../../../entities/CommentRating.entity';
import { AppDataSource } from '../../../config/data.source';
import { logger } from '../../../utils/logger';
import { CreateCommentRatingDto } from '../../../dtos/CreateCommentRatingDto';
import { Comment } from '../../../entities/Comment.entity';
import { User } from '../../../entities/User.entity';

class CommentRatingService {
  private commentRatingRepository: Repository<CommentRating>;

  constructor() {
    this.commentRatingRepository = AppDataSource.getRepository(CommentRating);
  }

  /**
   * Get All CommentRatings
   */
  public async getAllCommentRatings(): Promise<CommentRating[]> {
    logger.info(`${CommentRatingService.name}-getAllCommentRatings`);
    return this.commentRatingRepository.find();
  }

  /**
   * Get commentRating by Id
   */
  public async getCommentRatingById(id: string): Promise<CommentRating | null> {
    logger.info(`${CommentRatingService.name}-getCommentRatingById with id: ${id}`);
    return this.commentRatingRepository.findOne({ where: { id } });
  }

  /**
   * Create CommentRating
   */
  public async createCommentRating(data: CreateCommentRatingDto): Promise<CommentRating> {
    logger.info(`${CommentRatingService.name}-createCommentRating`);
    const entityManager = this.commentRatingRepository.manager;
    const comment = await entityManager.findOne(Comment, { where: { id: data.commentId } });
    if (!comment) throw new Error('comment not found');
    const user = await entityManager.findOne(User, { where: { id: data.userId } });
    if (!user) throw new Error('user not found');
    const newCreateCommentRating = this.commentRatingRepository.create({
      comment,
      user,
      likeDislike: data.likeDislike,
      stars: data.stars,
    });
    return this.commentRatingRepository.save(newCreateCommentRating);
  }

  /**
   * Update CommentRating By Id
   */
  public async updateCommentRatingById(id: string, updateData: Partial<CreateCommentRatingDto>) {
    logger.info(`${CommentRatingService.name}-updateCommentRatingById with id: ${id}`);
    const commentRating = await this.getCommentRatingById(id);
    if (!commentRating) return null;
    if (updateData.commentId) {
      const comment = await this.commentRatingRepository.manager.findOne(Comment, {
        where: { id: updateData.commentId },
      });
      if (!comment) throw new Error('comment not found');
      commentRating.comment = comment;
    }
    if (updateData.userId) {
      const user = await this.commentRatingRepository.manager.findOne(User, { where: { id: updateData.userId } });
      if (!user) throw new Error('user not found');
      commentRating.user = user;
    }
    Object.assign(commentRating, updateData);
    return this.commentRatingRepository.save(commentRating);
  }

  /**
   * Delete CommentRating By Id
   */
  public async deleteCommentRatingById(id: string) {
    logger.info(`${CommentRatingService.name}-deleteCommentRatingById with id: ${id}`);
    const commentRatingToDelete = await this.getCommentRatingById(id);
    if (!commentRatingToDelete) return null;
    await this.commentRatingRepository.delete(id);
    return commentRatingToDelete;
  }
}

export default CommentRatingService;
