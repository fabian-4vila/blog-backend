import { Request, Response } from 'express';
import PostService from '../service/post.service';
import { CreatePostDto } from '../../../dtos/CreatePostDto';
import UploadService from '../service/upload.service';
import { DeleteResult } from 'typeorm';
import { HttpResponse } from '../../../shared/http.response';
import { UpdatePostDto } from '../../../dtos/UpdatePostDto';
import { logger } from '../../../utils/logger';
import { instanceToPlain } from 'class-transformer';

class PostController {
  constructor(
    private readonly postService: PostService = new PostService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  /**
   * Get All Posts
   */
  public getAllPosts = async (_req: Request, res: Response) => {
    try {
      logger.info(`${PostController.name} - getAllPost`);
      const posts = await this.postService.getAllPosts();
      this.httpResponse.Ok(res, {
        post: instanceToPlain(posts),
      });
      return;
    } catch (error) {
      logger.error(`${PostController.name}- Error en getAllPosts: ${error}`);
      this.httpResponse.Error(res, 'Error retrieving posts');
      return;
    }
  };

  /**
   * Get Post By Id
   */
  public getPostById = async (req: Request, res: Response) => {
    try {
      logger.info(`${PostController.name} - getPostById`);
      const { id } = req.params;
      const post = await this.postService.getPostById(id);
      if (!post) {
        this.httpResponse.NotFound(res, { message: 'Post not found' });
        return;
      }
      this.httpResponse.Ok(res, { post, message: 'Post details obtained' });
      return;
    } catch (error) {
      logger.error(`${PostController.name}- Error en getPostById: ${error}`);
      this.httpResponse.Error(res, { message: 'Error retrieving post' });
      return;
    }
  };

  /**
   * Create Post
   */
  public createPost = async (req: Request, res: Response) => {
    try {
      logger.info(`${PostController.name} - CreatePost`);
      const { body: postBody } = req;
      if (!postBody.user_id) {
        this.httpResponse.Error(res, { message: 'userId is required' });
        return;
      }
      const files = req.files as Express.Multer.File[] | undefined;
      let uploadedFiles: { type: string; url: string }[] = [];
      if (files?.length) {
        uploadedFiles = await Promise.all(
          files.map(async (file) => {
            const uploaded = await UploadService.uploadFile(file);
            if (!uploaded?.url) {
              throw new Error(`File upload failed for ${file.originalname}`);
            }
            return { type: file.mimetype, url: uploaded.url };
          }),
        );
      }
      const postData: CreatePostDto = {
        userId: postBody.user_id,
        title: postBody.title,
        content: postBody.content,
        files: uploadedFiles.length > 0 ? uploadedFiles : undefined,
      };
      const newPost = await this.postService.createPost(postData);
      this.httpResponse.Create(res, { post: newPost, message: 'Successfully created post' });
      return;
    } catch (error) {
      logger.error(`${PostController.name}- Error en CreatePost: ${error}`);
      this.httpResponse.Error(res, { message: 'Error creating post' });
      return;
    }
  };

  /**
   * Update Post By Id
   */
  updatePostById = async (req: Request, res: Response) => {
    try {
      logger.info(`${PostController.name} - UpdatePostById`);
      const { id } = req.params;
      const updatePostDto: UpdatePostDto = req.body;
      const files = req.files as Express.Multer.File[] | undefined;
      const updatedPost = await this.postService.updatePostById(id, updatePostDto, files);
      this.httpResponse.Ok(res, updatedPost);
    } catch (error) {
      logger.error(`${PostController.name}- Error en UpdatePostById: ${error}`);
      this.httpResponse.Error(res, { message: 'Error updating post' });

    }
  };

  /**
   * Delete Post By Id
   */
  public deletePostById = async (req: Request, res: Response) => {
    try {
      logger.info(`${PostController.name} - DeletePostById`);
      const { id } = req.params;
      const deletedPost: DeleteResult = await this.postService.deletePostById(id);
      if (!deletedPost.affected) {
        this.httpResponse.NotFound(res, { message: 'Post not found' });
        return;
      }
      this.httpResponse.Ok(res, { post: deletedPost, message: 'Post deleted successfully' });
      return;
    } catch (error) {
      logger.error(`${PostController.name}- Error en DeletePostById: ${error}`);
      this.httpResponse.Error(res, { message: 'Error deleting post' });
      return;
    }
  };
}

export default PostController;
