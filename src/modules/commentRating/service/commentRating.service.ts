import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CommentRating } from '../../../entities/CommentRating.entity';
import { AppDataSource } from '../../../config/data.source';
import { logger } from '../../../utils/logger';
import { CreateCommentRatingDto } from '../../../dtos/CreateCommentRatingDto';
import { Comment } from '../../../entities/Comment.entity';
import { User } from '../../../entities/User.entity';
import { UpdateCommentRatingDto } from '../../../dtos/UpdateCommentRatingDto';

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
  public async getCommentRatingById(id: string): Promise<CommentRating> {
    logger.info(`${CommentRatingService.name}-getCommentRatingById with id: ${id}`);
    const commentRating = await this.commentRatingRepository.findOne({ where: { id } });
    if (!commentRating) throw new Error('Comment rating not found');
    return commentRating;
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
  public async updateCommentRatingById(id: string, updateData: UpdateCommentRatingDto): Promise<UpdateResult> {
    logger.info(`${CommentRatingService.name}-updateCommentRatingById with id: ${id}`);
    const commentRating = await this.getCommentRatingById(id);
    if (!commentRating) throw new Error(`Comment Rating with Id ${id} not found`);
    const { commentId, userId, ...otherData } = updateData;
    const updatedData: Partial<CommentRating> = { ...otherData };
    if (commentId) {
      const comment = await this.commentRatingRepository.manager.findOne(Comment, { where: { id: commentId } });
      if (!comment) throw new Error('Comment not found');
      updatedData.comment = comment;
    }
    if (userId) {
      const user = await this.commentRatingRepository.manager.findOne(User, { where: { id: userId } });
      if (!user) throw new Error('User not found');
      updatedData.user = user;
    }
    return await this.commentRatingRepository.update(id, updateData);
  }
  /**
   * Delete CommentRating By Id
   */
  public async deleteCommentRatingById(id: string): Promise<DeleteResult> {
    logger.info(`${CommentRatingService.name}-deleteCommentRatingById with id: ${id}`);
    const commentRatingToDelete = await this.getCommentRatingById(id);
    if (!commentRatingToDelete) throw new Error('Comment rating does not exist');
    return await this.commentRatingRepository.delete(id);
  }
}

export default CommentRatingService;
