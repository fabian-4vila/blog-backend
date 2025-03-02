import { Repository } from 'typeorm';
import { Comment } from '../../../entities/Comment.entity';
import { AppDataSource } from '../../../config/data.source';
import { logger } from '../../../utils/logger';
import { CreateCommentDto } from '../../../dtos/CreateCommentDto';
import { Post } from '../../../entities/Post.entity';
import { User } from '../../../entities/User.entity';
import { AuthenticatedUser } from '../../../interfaces/AuthUser';

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
    if (!comment) throw new Error('Comment not found');
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
      throw new Error('The post does not exist');
    }
    const newComment = this.CommentRepository.create({
      post: post,
      user: { id: user.id } as any, // Asociar el usuario autenticado al comentario
      text: data.text,
    });
    const savedComment = await this.CommentRepository.save(newComment);
    return savedComment;
  }

  /**
   * Update Comment by Id
   */
  public async updateCommentById(id: string, updateData: Partial<CreateCommentDto>) {
    logger.info(`${CommentService.name}-updateCommentById with id: ${id}`);
    const comment = await this.getCommentById(id);
    if (!comment) {
      throw new Error(`Comme con ID ${id} no encontrado`);
    }
    if (updateData.postId) {
      const post = await this.CommentRepository.manager.findOne(Post, { where: { id: updateData.postId } });
      if (!post) throw new Error('The post does not exist');
      comment.post = post;
    }
    if (updateData.userId) {
      const user = await this.CommentRepository.manager.findOne(User, { where: { id: updateData.userId } });
      if (!user) throw new Error('The user does not exist');
      comment.user = user;
    }
    Object.assign(comment, updateData);
    return this.CommentRepository.save(comment);
  }

  /**
   * Delete Comment By Id
   */
  public async deleteCommentById(id: string) {
    logger.info(`${CommentService.name}-deleteCommentById with id: ${id}`);
    const CommentToDelete = await this.getCommentById(id);
    if (!CommentToDelete) return null;
    await this.CommentRepository.delete(id);
    return CommentToDelete;
  }
}

export default CommentService;
