import { Router } from 'express';
import commentRatingController from '../commentRating/controller/commentRatingController';

class CommentRatingRoute {
  public path = '/ratingC';
  public router = Router();
  public CommentRatingController = new commentRatingController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}s`, this.CommentRatingController.getAllCommentRatings);
    this.router.get(`${this.path}/:id`, this.CommentRatingController.getCommentRatingById);
    this.router.post(`${this.path}`, this.CommentRatingController.createCommentRating);
    this.router.put(`${this.path}/:id`, this.CommentRatingController.updateCommentRatingById);
    this.router.delete(`${this.path}/:id`, this.CommentRatingController.deleteCommentRatingById);
  }
}

export default CommentRatingRoute;
