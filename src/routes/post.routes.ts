import { Router } from 'express';
import PostController from '../post/controller/PostController';
import upload from '../config/multer.config';
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
    this.router.post(`${this.path}`, upload.array('files'), this.postController.createPost);
    this.router.put(`${this.path}/:id`, upload.array('files', 5), this.postController.updatePostById);
    this.router.delete(`${this.path}/:id`, this.postController.deletePostById);
  }
}

export default PostRoute;
