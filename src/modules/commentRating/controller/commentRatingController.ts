import { Request, Response } from 'express';
import { CreateCommentRatingDto } from '../../../dtos/CreateCommentRatingDto';
import CommentRatingService from '../service/commentRating.service';
import { logger } from '../../../utils/logger';
import { HttpResponse } from '../../../shared/http.response';
import { instanceToPlain } from 'class-transformer';
import { DeleteResult, UpdateResult } from 'typeorm';

class CommentRatingController {
  constructor(
    private readonly commentRatingService: CommentRatingService = new CommentRatingService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  /**
   * Get All CommentRatings
   */
  public getAllCommentRatings = async (_req: Request, res: Response) => {
    try {
      logger.info(`${CommentRatingController.name}-getAllCommentRatings`);
      const ratings = await this.commentRatingService.getAllCommentRatings();
      this.httpResponse.Ok(res, {
        commentRatings: instanceToPlain(ratings),
      });
      return;
    } catch (error) {
      logger.error(`${CommentRatingController.name}- Error en getAllCommentRatings: ${error}`);
      this.httpResponse.Error(res, {
        message: 'Error getting comment rating',
      });
      return;
    }
  };

  /**
   * Get CommentRating by Id
   */
  public getCommentRatingById = async (req: Request, res: Response) => {
    try {
      logger.info(`${CommentRatingController.name}-getCommentRatingById with id: ${req.params.id}`);
      const rating = await this.commentRatingService.getCommentRatingById(req.params.id);
      if (!rating) {
        this.httpResponse.NotFound(res, {
          message: 'CommentRating not found',
        });
        return;
      }
      this.httpResponse.Ok(res, {
        commentRating: instanceToPlain(rating),
      });
      return;
    } catch (error) {
      logger.error(`${CommentRatingController.name}- Error en getCommentRatingById: ${error}`);
      this.httpResponse.Error(res, {
        message: 'Error getting comment rating',
      });
      return;
    }
  };

  /**
   * Create CommentRating
   */
  public createCommentRating = async (req: Request, res: Response) => {
    try {
      logger.info(`${CommentRatingController.name}-createCommentRating`);
      const ratingData: CreateCommentRatingDto = req.body;
      const newRating = await this.commentRatingService.createCommentRating(ratingData);
      this.httpResponse.Create(res, {
        CommentRating: instanceToPlain(newRating),
      });
    } catch (error) {
      logger.error(`${CommentRatingController.name}- Error en CreateCommentRating: ${error}`);
      this.httpResponse.Error(res, {
        message: 'Error creating comment rating',
      });
      return;
    }
  };

  /**
   * Update CommentRating By Id
   */
  public updateCommentRatingById = async (req: Request, res: Response) => {
    try {
      logger.info(`${CommentRatingController.name}-updateCommentRatingById with id: ${req.params.id}`);
      const updatedRating: UpdateResult = await this.commentRatingService.updateCommentRatingById(
        req.params.id,
        req.body,
      );
      if (!updatedRating.affected) {
        this.httpResponse.Error(res, {
          message: 'Comment rating not found',
        });
        return;
      }
      this.httpResponse.Ok(res, updatedRating);
    } catch (error) {
      logger.error(`${CommentRatingController.name}- Error en CreateCommentRating: ${error}`);
      this.httpResponse.Error(res, {
        message: 'Error updating commentRating',
      });
      return;
    }
  };

  /**
   * Delete CommentRating By Id
   */
  public deleteCommentRatingById = async (req: Request, res: Response) => {
    try {
      const { id: commentRatingId } = req.params;
      logger.info(`${CommentRatingController.name}-deleteCommentRatingById with id: ${req.params.id}`);
      const deletedRating: DeleteResult = await this.commentRatingService.deleteCommentRatingById(commentRatingId);
      if (!deletedRating.affected) {
        this.httpResponse.NotFound(res, {
          message: 'Commentrating not found',
        });
        return;
      }
      this.httpResponse.Ok(res, deletedRating);
    } catch (error) {
      logger.error(`${CommentRatingController.name}- Error en CreateCommentRating: ${error}`);
      this.httpResponse.Error(res, {
        message: 'Error deleting commentRating',
      });
      return;
    }
  };
}

export default CommentRatingController;
