import { Router } from 'express';
import PostController from '../post/controller/PostController';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';
import { RoleType } from '../types/Role.type';

class PostRoute {
  public path = '/posts';
  public router = Router();
  public postController: PostController = new PostController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    // Solo ADMIN puede crear posts
    this.router.post(`${this.path}`, authenticateJWT, authorizeRoles(RoleType.ADMIN), this.postController.createPost);

    // Todos pueden ver los posts
    this.router.get(`${this.path}`, this.postController.getAllPosts);
    this.router.get(`${this.path}/:id`, this.postController.getPostById);

    // Solo el ADMIN puede modificar o eliminar posts
    this.router.put(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles(RoleType.ADMIN),
      this.postController.updatePostById,
    );
    this.router.delete(
      `${this.path}/:id`,
      authenticateJWT,
      authorizeRoles(RoleType.ADMIN),
      this.postController.deletePostById,
    );
  }
}

export default PostRoute;
