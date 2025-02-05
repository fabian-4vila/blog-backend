import { Router } from 'express';
import CommentController from '../comment/controller/commentController';

class CommentRoute {
  public path = '/comment';
  public router = Router();
  public CommentController = new CommentController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}s`, this.CommentController.getAllComments);
    this.router.get(`${this.path}:/id`, this.CommentController.getCommentById);
    this.router.post(`${this.path}`, this.CommentController.createComment);
    this.router.put(`${this.path}:/id`, this.CommentController.updateCommentById);
    this.router.delete(`${this.path}:/id`, this.CommentController.deleteCommentById);
  }
}

export default CommentRoute;
