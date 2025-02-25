import { Request, Response } from 'express';
import PostService from '../service/post.service';
import { CreatePostDto } from '../../../dtos/CreatePostDto';
import { logger } from '../../../utils/logger';
import UploadService from '../service/upload.service';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { HttpResponse } from '../../../shared/http.response';
import { DeleteResult } from 'typeorm';
import { validate } from 'class-validator';

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
      logger.info(`${PostController.name}-getAllPost`);
      const posts = await this.postService.getAllPosts();
      this.httpResponse.Ok(res, {
        posts: instanceToPlain(posts),
      });
      return;
    } catch (error) {
      logger.error(`${PostController.name}- Error en getAllUsers: ${error}`);
      this.httpResponse.Error(res, {
        message: 'Error getting posts',
      });
      return;
    }
  };

  /**
   * Get Post By Id
   */
  public getPostById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      logger.info(`${PostController.name}-getPostById`);
      const post = await this.postService.getPostById(id);
      if (!post) {
        this.httpResponse.NotFound(res, {
          message: 'Post not found',
        });
        return;
      }
      this.httpResponse.Ok(res, {
        post: instanceToPlain(post),
      });
      return;
    } catch (error) {
      logger.error(`${PostController.name}- Error en : ${error}-getPostById`);
      this.httpResponse.Error(res, {
        message: 'Error getting post',
      });
      return;
    }
  };

  /**
   * Create Post
   */
  public createPost = async (req: Request, res: Response) => {
    try {
      logger.info(`${PostController.name} - CreatePost - Body received: ${JSON.stringify(req.body)}`);
      const files = (req.files as Express.Multer.File[]) ?? [];
      logger.info(`Files received: ${files.length} files`);
      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          try {
            const uploaded = await UploadService.uploadFile(file);
            logger.info(`Uploaded file: ${uploaded.url}`);
            return { type: file.mimetype, url: uploaded.url };
          } catch (uploadError) {
            logger.error(
              `Error uploading file ${file.originalname}: ${JSON.stringify(uploadError, Object.getOwnPropertyNames(uploadError))}`,
            );
            throw new Error(`Error uploading file: ${file.originalname}`);
          }
        }),
      );
      const postData = plainToInstance(CreatePostDto, {
        ...req.body,
        userId: req.body.user_id,
        files: uploadedFiles,
      });
      const errors = await validate(postData);
      if (errors.length > 0) {
        logger.warn(`Validation failed: ${JSON.stringify(errors)}`);
        this.httpResponse.Error(res, {
          message: 'Validation failed',
          errors,
        });
        return;
      }
      const newPost = await this.postService.createPost(postData);
      logger.info(`Post created with ID: ${newPost.id}`);
      this.httpResponse.Create(res, {
        post: instanceToPlain(newPost),
      });
    } catch (error) {
      logger.error(`${PostController.name} - Error in CreatePost: ${error}`);
      this.httpResponse.Error(res, {
        message: `Error creating post: ${error}`,
      });
    }
  };

  /**
   * Update Post By Id
   */
  public updatePostById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateBody: Partial<CreatePostDto> = req.body;
      const files = req.files as Express.Multer.File[];
      if (files) {
        const uploadedFiles = await Promise.all(files.map((file) => UploadService.uploadFile(file)));
        updateBody.files = uploadedFiles;
      }
      const updatedPost = await this.postService.updatePostById(id, updateBody);
      if (!updatedPost) {
        this.httpResponse.NotFound(res, {
          message: 'Post not found',
        });
        return;
      }
      this.httpResponse.Ok(res, updatedPost);
      return;
    } catch (error) {
      this.httpResponse.Error(res, {
        message: 'Error updating post',
      });
      return;
    }
  };
  /**
   * Delete Post By Id
   */
  public deletePostById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedPost: DeleteResult = await this.postService.deletePostById(id);
      if (!deletedPost.affected) {
        this.httpResponse.Error(res, {
          message: 'Post does not exist',
        });
        return;
      }
      this.httpResponse.Ok(res, deletedPost);
      return;
    } catch (error) {
      this.httpResponse.Error(res, {
        message: 'Error deleting post',
      });
      return;
    }
  };
}

export default PostController;
