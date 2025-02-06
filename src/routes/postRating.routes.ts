import { Router } from 'express';
import postRatingController from '../postRating/controller/postRatingController';

class PostRatingRoute {
  public path = '/ratingC';
  public router = Router();
  public PostRatingController = new postRatingController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}s`, this.PostRatingController.getAllPostRatings);
    this.router.get(`${this.path}/:id`, this.PostRatingController.getPostRatingById);
    this.router.post(`${this.path}`, this.PostRatingController.createPostRating);
    this.router.put(`${this.path}/:id`, this.PostRatingController.updatePostRatingById);
    this.router.delete(`${this.path}/:id`, this.PostRatingController.deletePostRatingById);
  }
}

export default PostRatingRoute;
