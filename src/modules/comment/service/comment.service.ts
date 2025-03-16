import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Comment } from '../../../entities/Comment.entity';
import { AppDataSource } from '../../../config/data.source';
import { logger } from '../../../utils/logger';
import { CreateCommentDto } from '../../../dtos/CreateCommentDto';
import { Post } from '../../../entities/Post.entity';
import { AuthenticatedUser } from '../../../interfaces/AuthUser';
import { UpdateCommentDto } from '../../../dtos/UpdateCommentDto';
import { HttpException } from '../../../exceptions/httpException';

class CommentService {
  private CommentRepository: Repository<Comment>;

  constructor() {
    this.CommentRepository = AppDataSource.getRepository(Comment);
  }

  /**
   * Get All Comment
   */
  public async getAllComments(): Promise<Comment[]> {
    logger.info(`${CommentService.name}-getAllComments`);
    return this.CommentRepository.find();
  }

  /**
   * Get Comment By Id
   */
  public async getCommentById(id: string): Promise<Comment> {
    logger.info(`${CommentService.name}-getCommentById with id: ${id}`);
    const comment = await this.CommentRepository.findOne({ where: { id } });
    if (!comment) throw new HttpException(404, 'Comment not found');
    return comment;
  }

  /**
   * Create Comment
   */
  public async createComment(data: CreateCommentDto, user: AuthenticatedUser): Promise<Comment> {
    logger.info(`${CommentService.name} - createComment`);
    const entityManager = this.CommentRepository.manager;
    const post = await entityManager.findOne(Post, { where: { id: data.postId }, select: ['id'] });
    if (!post) {
      throw new HttpException(400, 'The post does not exist');
    }
    const newComment = this.CommentRepository.create({
      post: post,
      user: { id: user.id },
      text: data.text,
    });
    const savedComment = await this.CommentRepository.save(newComment);
    return savedComment;
  }

  /**
   * Update Comment by Id
   */
  public async updateCommentById(id: string, updateData: UpdateCommentDto): Promise<UpdateResult> {
    logger.info(`${CommentService.name}-updateCommentById with id: ${id}`);
    const comment = await this.getCommentById(id);
    if (!comment) {
      throw new HttpException(404, `Comme con ID ${id} no encontrado`);
    }
    Object.assign(comment, updateData);
    return await this.CommentRepository.update(id, comment);
  }

  /**
   * Delete Comment By Id
   */
  public async deleteCommentById(id: string): Promise<DeleteResult> {
    logger.info(`${CommentService.name}-deleteCommentById with id: ${id}`);
    const CommentToDelete = await this.getCommentById(id);
    if (!CommentToDelete) throw new Error('comment does not exist');
    return await this.CommentRepository.delete(id);
  }
}

export default CommentService;
