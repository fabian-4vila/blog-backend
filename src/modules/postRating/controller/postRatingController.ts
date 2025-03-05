import { Request, Response } from 'express';
import { CreatePostRatingDto } from '../../../dtos/CreatePostRatingDto';
import PostRatingService from '../service/postRating.service';
import { logger } from '../../../utils/logger';
import { HttpResponse } from '../../../shared/http.response';
import { instanceToPlain } from 'class-transformer';
import { DeleteResult, UpdateResult } from 'typeorm';
import { QueryFailedError } from 'typeorm';

class PostRatingController {
  constructor(
    private readonly postRatingService: PostRatingService = new PostRatingService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  /**
   * Get All PostRating
   */
  public getAllPostRatings = async (_req: Request, res: Response) => {
    try {
      logger.info(`${PostRatingController.name}-getAllPostRatings`);
      const ratings = await this.postRatingService.getAllPostRatings();
      this.httpResponse.Ok(res, {
        postRating: instanceToPlain(ratings),
      });
      return;
    } catch (error) {
      logger.error(`${PostRatingController.name}- Error en getAllPostRating: ${error}`);
      this.httpResponse.Error(res, {
        message: 'Error getting post rating',
      });
      return;
    }
  };

  /**
   * Get PostRating By Id
   */
  public getPostRatingById = async (req: Request, res: Response) => {
    try {
      logger.info(`${PostRatingController.name}-getPostRatingById with id: ${req.params.id}`);
      const rating = await this.postRatingService.getPostRatingById(req.params.id);
      if (!rating) {
        this.httpResponse.NotFound(res, 'Post rating not found');
        return;
      }
      this.httpResponse.Ok(res, {
        postRating: instanceToPlain(rating),
      });
      return;
    } catch (error) {
      logger.error(`${PostRatingController.name}- Error en getPostRatingById: ${error}`);
      this.httpResponse.Error(res, {
        message: `Error getting post rating`,
      });
      return;
    }
  };

  /**
   * Create PostRating
   */
  // public createPostRating = async (req: Request, res: Response) => {
  //   try {
  //     logger.info(`${PostRatingController.name}-createPostRating`);
  //     const ratingData: CreatePostRatingDto = req.body;
  //     const newRating = await this.postRatingService.createPostRating(ratingData);
  //     this.httpResponse.Create(res, {
  //       postRating: instanceToPlain(newRating),
  //     });
  //     return;
  //   } catch (error) {
  //     logger.error(`${PostRatingController.name}- Error en createPostRating: ${error}`);
  //     this.httpResponse.Error(res, {
  //       message: `Error creating post rating`,
  //     });
  //     return;
  //   }
  // };

  public createPostRating = async (req: Request, res: Response) => {
    try {
      logger.info(`${PostRatingController.name}-createPostRating`);
      const ratingData: CreatePostRatingDto = req.body;
      const newRating = await this.postRatingService.createPostRating(ratingData);

      this.httpResponse.Create(res, {
        postRating: instanceToPlain(newRating),
      });
      return;
    } catch (error) {
      logger.error(`${PostRatingController.name}- Error en createPostRating: ${error}`);

      // Verificar si el error es por restricción única
      if (error instanceof QueryFailedError && error.message.includes('duplicate key value')) {
        this.httpResponse.BadRequest(res, {
          message: 'You can only rate a post once.',
        });
        return;
      }

      this.httpResponse.Error(res, {
        message: 'Error creating post rating',
      });
      return;
    }
  };

  /**
   * Update PostRating By Id
   */
  public updatePostRatingById = async (req: Request, res: Response) => {
    try {
      logger.info(`${PostRatingController.name}-updatePostRatingById with id: ${req.params.id}`);
      const updatedRating: UpdateResult = await this.postRatingService.updatePostRatingById(req.params.id, req.body);
      if (!updatedRating.affected) {
        this.httpResponse.NotFound(res, {
          message: 'Post rating not found',
        });
        return;
      }
      this.httpResponse.Ok(res, updatedRating);
      return;
    } catch (error) {
      logger.error(`${PostRatingController.name}- Error en UpdatePostRating: ${error}`);
      this.httpResponse.Error(res, {
        message: `Error Updating post rating`,
      });
      return;
    }
  };

  /**
   * Delete PostRating By Id
   */
  public deletePostRatingById = async (req: Request, res: Response) => {
    try {
      logger.info(`${PostRatingController.name}-deletePostRatingById with id: ${req.params.id}`);
      const deletedRating: DeleteResult = await this.postRatingService.deletePostRatingById(req.params.id);
      if (!deletedRating.affected) {
        this.httpResponse.NotFound(res, {
          message: 'Post rating not exist',
        });
        return;
      }
      this.httpResponse.Ok(res, deletedRating);
      return;
    } catch (error) {
      logger.error(`${PostRatingController.name}- Error en DeletePostRating: ${error}`);
      this.httpResponse.Error(res, {
        message: `Error deleting post rating`,
      });
      return;
    }
  };
}

export default PostRatingController;
