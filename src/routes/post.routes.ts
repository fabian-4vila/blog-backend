import { Router } from 'express';
import PostController from '../modules/post/controller/PostController';
import upload from '../config/multer.config';

import { RoleType } from '../types/Role.type';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';
import { fileFilterMiddleware } from '../middlewares/fileFilter.middleware';

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

    this.router.post(
      `${this.path}`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      upload.array('files', 5),
      fileFilterMiddleware,
      this.postController.createPost,
    );

    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      upload.array('files', 5),
      fileFilterMiddleware,
      this.postController.updatePostById,
    );

    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles([RoleType.ADMIN]),
      this.postController.deletePostById,
    );
  }
}

export default PostRoute;
