import { Router } from 'express';
import PostController from '../post/controller/PostController';

class PostRoute {
  public path = '/post';
  public router = Router();
  public postController = new PostController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}s`, this.postController.getAllPosts);
    this.router.get(`${this.path}/:id`, this.postController.getPostById);
    this.router.post(`${this.path}`, this.postController.createPost);
    this.router.put(`${this.path}/:id`, this.postController.updatePostById);
    this.router.delete(`${this.path}/:id`, this.postController.deletePostById);
  }
}

export default PostRoute;
