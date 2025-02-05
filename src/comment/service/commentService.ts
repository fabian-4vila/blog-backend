import { Repository } from 'typeorm';
import { Comment } from '../../entities/Comment.entity';
import { AppDataSource } from '../../config/data.source';
import { logger } from '../../utils/logger';
import { CreateCommentDto } from '../../dtos/CreateCommentDto';

class CommentService {
  private CommentRepository: Repository<Comment>;

  constructor() {
    this.CommentRepository = AppDataSource.getRepository(Comment);
  }

  /**
   * Obtener todas las calificaciones de posts
   */
  public async getAllComments(): Promise<Comment[]> {
    logger.info(`${CommentService.name}-getAllComments`);
    return this.CommentRepository.find({ relations: ['post', 'user'] });
  }

  /**
   * Obtener una calificación de Comment por ID
   */
  public async getCommentById(id: string): Promise<Comment | null> {
    logger.info(`${CommentService.name}-getCommentById with id: ${id}`);
    return this.CommentRepository.findOne({ where: { id } });
  }

  /**
   * Crear una nueva calificación de Comment
   */
  public async createComment(data: CreateCommentDto): Promise<Comment> {
    logger.info(`${CommentService.name}-createComment`);
    const newComment = this.CommentRepository.create(data);
    return this.CommentRepository.save(newComment);
  }

  /**
   * Actualizar una calificación de Comment por ID
   */
  public async updateCommentById(id: string, updateData: Partial<CreateCommentDto>) {
    logger.info(`${CommentService.name}-updateCommentById with id: ${id}`);
    const Comment = await this.getCommentById(id);
    if (!Comment) return null;
    await this.CommentRepository.update(id, updateData);
    return this.getCommentById(id);
  }

  /**
   * Eliminar una calificación de Comment por ID
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
