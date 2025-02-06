import { Repository } from 'typeorm';
import { CommentRating } from '../../entities/CommentRating.entity';
import { AppDataSource } from '../../config/data.source';
import { logger } from '../../utils/logger';
import { CreateCommentRatingDto } from '../../dtos/CreateCommentRatingDto';

class CommentRatingService {
  private commentRatingRepository: Repository<CommentRating>;

  constructor() {
    this.commentRatingRepository = AppDataSource.getRepository(CommentRating);
  }

  /**
   * Obtener todas las calificaciones de comentarios
   */
  public async getAllCommentRatings(): Promise<CommentRating[]> {
    logger.info(`${CommentRatingService.name}-getAllCommentRatings`);
    return this.commentRatingRepository.find({ relations: ['user', 'comment'] });
  }

  /**
   * Obtener una calificación de comentario por ID
   */
  public async getCommentRatingById(id: string): Promise<CommentRating | null> {
    logger.info(`${CommentRatingService.name}-getCommentRatingById with id: ${id}`);
    return this.commentRatingRepository.findOne({ where: { id } });
  }

  /**
   * Crear una nueva calificación de comentario
   */
  public async createCommentRating(data: CreateCommentRatingDto): Promise<CommentRating> {
    logger.info(`${CommentRatingService.name}-createCommentRating`);
    const newCommentRating = this.commentRatingRepository.create(data);
    return this.commentRatingRepository.save(newCommentRating);
  }

  /**
   * Actualizar una calificación de comentario por ID
   */
  public async updateCommentRatingById(id: string, updateData: Partial<CreateCommentRatingDto>) {
    logger.info(`${CommentRatingService.name}-updateCommentRatingById with id: ${id}`);
    const commentRating = await this.getCommentRatingById(id);
    if (!commentRating) return null;
    await this.commentRatingRepository.update(id, updateData);
    return this.getCommentRatingById(id);
  }

  /**
   * Eliminar una calificación de comentario por ID
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
