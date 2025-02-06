import { Request, Response } from 'express';
import { CreateCommentRatingDto } from '../../dtos/CreateCommentRatingDto';
import CommentRatingService from '../service/commentRating.service';
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
    try {
      logger.info(`${CommentRatingController.name}-getAllCommentRatings`);
      const ratings = await this.commentRatingService.getAllCommentRatings();
      res.status(200).json({
        ok: true,
        ratings,
        message: `commentRatings list obtained successfully`,
      });
    } catch (error) {
      logger.error(`${CommentRatingController.name}- Error en getAllCommentRatings: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error getting commentRating',
      });
      return;
    }
  };

  /**
   * Obtener una calificación de comentario por ID
   */
  public getCommentRatingById = async (req: Request, res: Response) => {
    try {
      logger.info(`${CommentRatingController.name}-getCommentRatingById with id: ${req.params.id}`);
      const rating = await this.commentRatingService.getCommentRatingById(req.params.id);
      if (!rating) {
        res.status(404).json({
          ok: false,
          message: 'CommentRating not found',
        });
        return;
      }
      res.status(200).json({
        ok: true,
        rating,
        message: `CommentRting details obtained`,
      });
    } catch (error) {
      logger.error(`${CommentRatingController.name}- Error en getCommentRatingById: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error getting commentRating',
      });
      return;
    }
  };

  /**
   * Crear una nueva calificación de comentario
   */
  public createCommentRating = async (req: Request, res: Response) => {
    try {
      logger.info(`${CommentRatingController.name}-createCommentRating`);
      const ratingData: CreateCommentRatingDto = req.body;
      const newRating = await this.commentRatingService.createCommentRating(ratingData);
      res.status(201).json({
        ok: true,
        CommentRating: newRating,
        message: `Successfuly create commentRating`,
      });
    } catch (error) {
      logger.error(`${CommentRatingController.name}- Error en CreateCommentRating: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error creating commentRating',
      });
      return;
    }
  };

  /**
   * Actualizar una calificación de comentario por ID
   */
  public updateCommentRatingById = async (req: Request, res: Response) => {
    try {
      logger.info(`${CommentRatingController.name}-updateCommentRatingById with id: ${req.params.id}`);
      const updatedRating = await this.commentRatingService.updateCommentRatingById(req.params.id, req.body);
      if (!updatedRating) {
        res.status(404).json({
          ok: false,
          message: 'Comment rating not found',
        });
        return;
      }
      res.status(200).json({
        ok: true,
        commentRating: updatedRating,
        message: `Successfuly updated commentRating`,
      });
    } catch (error) {
      logger.error(`${CommentRatingController.name}- Error en CreateCommentRating: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error updating commentRating',
      });
      return;
    }
  };

  /**
   * Eliminar una calificación de comentario por ID
   */
  public deleteCommentRatingById = async (req: Request, res: Response) => {
    try {
      const { id: commentRatingId } = req.params;
      logger.info(`${CommentRatingController.name}-deleteCommentRatingById with id: ${req.params.id}`);
      const deletedRating = await this.commentRatingService.deleteCommentRatingById(commentRatingId);
      if (!deletedRating) {
        res.status(404).json({
          ok: false,
          message: 'Commentrating not found',
        });
        return;
      }
      res.status(200).json({
        ok: true,
        commentRating: deletedRating,
        message: 'Commentrating deleted successfully',
      });
    } catch (error) {
      logger.error(`${CommentRatingController.name}- Error en CreateCommentRating: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error deleting commentRating',
      });
      return;
    }
  };
}

export default CommentRatingController;
