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
    try {
      logger.info(`${PostRatingController.name}-getAllPostRatings`);
      const ratings = await this.postRatingService.getAllPostRatings();
      res.status(200).json({
        ok: true,
        ratings,
        message: `PostRatings list obtained successfully`,
      });
    } catch (error) {
      logger.error(`${PostRatingController.name}- Error en getAllPostRating: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error getting postRating',
      });
      return;
    }
  };

  /**
   * Obtener una calificación de post por ID
   */
  public getPostRatingById = async (req: Request, res: Response) => {
    try {
      logger.info(`${PostRatingController.name}-getPostRatingById with id: ${req.params.id}`);
      const rating = await this.postRatingService.getPostRatingById(req.params.id);
      if (!rating) {
        res.status(404).json({
          ok: false,
          message: 'Post rating not found',
        });
        return;
      }
      res.status(200).json({
        ok: true,
        rating,
        message: `PostRating details obtained`,
      });
    } catch (error) {
      logger.error(`${PostRatingController.name}- Error en getPostRatingById: ${error}`);
      res.status(500).json({
        ok: false,
        message: `Error getting postRating`,
      });
      return;
    }
  };

  /**
   * Crear una nueva calificación de post
   */
  public createPostRating = async (req: Request, res: Response) => {
    try {
      logger.info(`${PostRatingController.name}-createPostRating`);
      const ratingData: CreatePostRatingDto = req.body;
      const newRating = await this.postRatingService.createPostRating(ratingData);
      res.status(201).json({
        ok: true,
        rating: newRating,
        message: `Successfully created postRating`,
      });
    } catch (error) {
      logger.error(`${PostRatingController.name}- Error en createPostRating: ${error}`);
      res.status(500).json({
        ok: false,
        message: `Error creating postRating`,
      });
      return;
    }
  };

  /**
   * Actualizar una calificación de post por ID
   */
  public updatePostRatingById = async (req: Request, res: Response) => {
    try {
      logger.info(`${PostRatingController.name}-updatePostRatingById with id: ${req.params.id}`);
      const updatedRating = await this.postRatingService.updatePostRatingById(req.params.id, req.body);
      if (!updatedRating) {
        res.status(404).json({
          ok: false,
          message: 'Post rating not found',
        });
        return;
      }
      res.status(200).json({
        ok: true,
        rating: updatedRating,
        message: `Successfully updated postRating`,
      });
    } catch (error) {
      logger.error(`${PostRatingController.name}- Error en UpdatePostRating: ${error}`);
      res.status(500).json({
        ok: false,
        message: `Error Updating postRating`,
      });
      return;
    }
  };

  /**
   * Eliminar una calificación de post por ID
   */
  public deletePostRatingById = async (req: Request, res: Response) => {
    try {
      logger.info(`${PostRatingController.name}-deletePostRatingById with id: ${req.params.id}`);
      const deletedRating = await this.postRatingService.deletePostRatingById(req.params.id);
      if (!deletedRating) {
        res.status(404).json({
          ok: false,
          message: 'Post rating not found',
        });
        return;
      }
      res.status(200).json({
        ok: true,
        rating: deletedRating,
        message: 'Post rating deleted successfully',
      });
    } catch (error) {
      logger.error(`${PostRatingController.name}- Error en DeletePostRating: ${error}`);
      res.status(500).json({
        ok: false,
        message: `Error deleting postRating`,
      });
      return;
    }
  };
}

export default PostRatingController;
