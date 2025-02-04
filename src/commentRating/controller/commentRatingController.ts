import { Request, Response } from 'express';
import { CreateCommentRatingDto } from '../../dtos/CreateCommentRatingDto';
import CommentRatingService from '../service/commentRatingService';
import { logger } from '../../utils/logger';

class CommentRatingController {
  private commentRatingService: CommentRatingService;

  constructor() {
    this.commentRatingService = new CommentRatingService();
  }

  /**
   * Obtener todas las calificaciones de comentarios
   */
  public getAllCommentRatings = async (_req: Request, res: Response) => {
    logger.info(`${CommentRatingController.name}-getAllCommentRatings`);
    const ratings = await this.commentRatingService.getAllCommentRatings();
    res.json(ratings);
  };

  /**
   * Obtener una calificación de comentario por ID
   */
  public getCommentRatingById = async (req: Request, res: Response) => {
    logger.info(`${CommentRatingController.name}-getCommentRatingById with id: ${req.params.id}`);
    const rating = await this.commentRatingService.getCommentRatingById(req.params.id);
    if (!rating) {
      res.status(404).json({
        ok: false,
        message: 'Comment rating not found',
      });
      return;
    }
    res.json(rating);
  };

  /**
   * Crear una nueva calificación de comentario
   */
  public createCommentRating = async (req: Request, res: Response) => {
    logger.info(`${CommentRatingController.name}-createCommentRating`);
    const ratingData: CreateCommentRatingDto = req.body;
    const newRating = await this.commentRatingService.createCommentRating(ratingData);
    res.status(201).json(newRating);
  };

  /**
   * Actualizar una calificación de comentario por ID
   */
  public updateCommentRatingById = async (req: Request, res: Response) => {
    logger.info(`${CommentRatingController.name}-updateCommentRatingById with id: ${req.params.id}`);
    const updatedRating = await this.commentRatingService.updateCommentRatingById(req.params.id, req.body);
    if (!updatedRating) {
      res.status(404).json({ message: 'Comment rating not found' });
      return;
    }
    res.json(updatedRating);
  };

  /**
   * Eliminar una calificación de comentario por ID
   */
  public deleteCommentRatingById = async (req: Request, res: Response) => {
    logger.info(`${CommentRatingController.name}-deleteCommentRatingById with id: ${req.params.id}`);
    const deletedRating = await this.commentRatingService.deleteCommentRatingById(req.params.id);
    if (!deletedRating) {
      return res.status(404).json({ message: 'Comment rating not found' });
    }
    res.json({ message: 'Comment rating deleted successfully' });
    return;
  };
}

export default new CommentRatingController();
