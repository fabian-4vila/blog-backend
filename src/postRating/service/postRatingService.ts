import { Repository } from 'typeorm';
import { PostRating } from '../../entities/PostRating.entity';
import { AppDataSource } from '../../config/data.source';
import { logger } from '../../utils/logger';
import { CreatePostRatingDto } from '../../dtos/CreatePostRatingDto';

class PostRatingService {
  private postRatingRepository: Repository<PostRating>;

  constructor() {
    this.postRatingRepository = AppDataSource.getRepository(PostRating);
  }

  /**
   * Obtener todas las calificaciones de posts
   */
  public async getAllPostRatings(): Promise<PostRating[]> {
    logger.info(`${PostRatingService.name}-getAllPostRatings`);
    return this.postRatingRepository.find({ relations: ['post', 'user'] });
  }

  /**
   * Obtener una calificación de post por ID
   */
  public async getPostRatingById(id: string): Promise<PostRating | null> {
    logger.info(`${PostRatingService.name}-getPostRatingById with id: ${id}`);
    return this.postRatingRepository.findOne({ where: { id } });
  }

  /**
   * Crear una nueva calificación de post
   */
  public async createPostRating(data: CreatePostRatingDto): Promise<PostRating> {
    logger.info(`${PostRatingService.name}-createPostRating`);
    const newPostRating = this.postRatingRepository.create(data);
    return this.postRatingRepository.save(newPostRating);
  }

  /**
   * Actualizar una calificación de post por ID
   */
  public async updatePostRatingById(id: string, updateData: Partial<CreatePostRatingDto>) {
    logger.info(`${PostRatingService.name}-updatePostRatingById with id: ${id}`);
    const postRating = await this.getPostRatingById(id);
    if (!postRating) return null;
    await this.postRatingRepository.update(id, updateData);
    return this.getPostRatingById(id);
  }

  /**
   * Eliminar una calificación de post por ID
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
