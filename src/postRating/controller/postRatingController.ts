import { Request, Response } from 'express';
import { CreatePostRatingDto } from '../../dtos/CreatePostRatingDto';
import PostRatingService from '../service/postRatingService';
import { logger } from '../../utils/logger';

class PostRatingController {
  private postRatingService: PostRatingService;

  constructor() {
    this.postRatingService = new PostRatingService();
  }

  /**
   * Obtener todas las calificaciones de posts
   */
  public getAllPostRatings = async (_req: Request, res: Response) => {
    logger.info(`${PostRatingController.name}-getAllPostRatings`);
    const ratings = await this.postRatingService.getAllPostRatings();
    res.json(ratings);
  };

  /**
   * Obtener una calificación de post por ID
   */
  public getPostRatingById = async (req: Request, res: Response) => {
    logger.info(`${PostRatingController.name}-getPostRatingById with id: ${req.params.id}`);
    const rating = await this.postRatingService.getPostRatingById(req.params.id);
    if (!rating) {
      res.status(404).json({ message: 'Post rating not found' });
      return;
    }
    res.json(rating);
  };

  /**
   * Crear una nueva calificación de post
   */
  public createPostRating = async (req: Request, res: Response) => {
    logger.info(`${PostRatingController.name}-createPostRating`);
    const ratingData: CreatePostRatingDto = req.body;
    const newRating = await this.postRatingService.createPostRating(ratingData);
    res.status(201).json(newRating);
  };

  /**
   * Actualizar una calificación de post por ID
   */
  public updatePostRatingById = async (req: Request, res: Response) => {
    logger.info(`${PostRatingController.name}-updatePostRatingById with id: ${req.params.id}`);
    const updatedRating = await this.postRatingService.updatePostRatingById(req.params.id, req.body);
    if (!updatedRating) {
      res.status(404).json({ message: 'Post rating not found' });
      return;
    }
    res.json(updatedRating);
  };

  /**
   * Eliminar una calificación de post por ID
   */
  public deletePostRatingById = async (req: Request, res: Response) => {
    logger.info(`${PostRatingController.name}-deletePostRatingById with id: ${req.params.id}`);
    const deletedRating = await this.postRatingService.deletePostRatingById(req.params.id);
    if (!deletedRating) {
      res.status(404).json({ message: 'Post rating not found' });
      return;
    }
    res.json({ message: 'Post rating deleted successfully' });
  };
}

export default new PostRatingController();
