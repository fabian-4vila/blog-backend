import { Request, Response } from 'express';
import PostService from '../service/post.service';
import { CreatePostDto } from '../../../dtos/CreatePostDto';
import { logger } from '../../../utils/logger';
import UploadService from '../service/upload.service';

class PostController {
  private readonly postService: PostService = new PostService();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  /**
   * Get All Posts
   */
  public getAllPosts = async (_req: Request, res: Response) => {
    try {
      logger.info(`${PostController.name}-getAllPost`);
      const posts = await this.postService.getAllPosts();
      res.json({
        ok: true,
        posts: posts,
        message: `Post list obtained successfully`,
      });
      return;
    } catch (error) {
      logger.error(`${PostController.name}- Error en getAllUsers: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error retrieving posts',
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
        res.status(404).json({
          ok: false,
          message: 'Post not found',
        });
        return;
      }
      res.status(200).json({
        ok: true,
        post,
        message: `Post details obtained`,
      });
      return;
    } catch (error) {
      logger.error(`${PostController.name}- Error en : ${error}-getPostById`);
      res.status(500).json({
        ok: false,
        message: 'Error retrieving post',
      });
      return;
    }
  };

  /**
   * Create Post
   */
  public createPost = async (req: Request, res: Response) => {
    try {
      const { body: postBody } = req;
      logger.info(`${PostController.name} - CreatePost - Body received: ${JSON.stringify(postBody)}`);
      if (!postBody.user_id) {
        res.status(400).json({
          ok: false,
          message: 'userId is required',
        });
        return;
      }
      const files = req.files as Express.Multer.File[];
      logger.info(`Files received: ${files.length} files`);
      if (!files || files.length === 0) {
        res.status(400).json({ ok: false, message: 'No files uploaded' });
        return;
      }
      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          const uploaded = await UploadService.uploadFile(file);
          logger.info(`Uploaded file: ${uploaded.url}`);
          return { type: file.mimetype, url: uploaded.url };
        }),
      );
      const postData: CreatePostDto = {
        userId: postBody.user_id,
        title: postBody.title,
        content: postBody.content,
        files: uploadedFiles,
      };
      const newPost = await this.postService.createPost(postData);
      logger.info(`Post created with ID: ${newPost.id}`);
      res.status(201).json({
        ok: true,
        post: newPost,
        message: `Successfully created post`,
      });
    } catch (error) {
      logger.error(`${PostController.name} - Error in CreatePost: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error creating post',
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
        res.status(404).json({
          ok: false,
          message: 'Post not found',
        });
        return;
      }
      res.status(200).json({
        ok: true,
        post: updatedPost,
        message: `Successfully updated Post`,
      });
      return;
    } catch (error) {
      res.status(500).json({
        error: Error,
        ok: false,
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
      const deletedPost = await this.postService.deletePostById(id);
      if (!deletedPost) {
        res.status(404).json({
          ok: false,
          message: 'Post not found',
        });
        return;
      }
      res.status(200).json({
        ok: true,
        post: deletedPost,
        message: 'Post deleted successfully',
      });
      return;
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: 'Error deleting post',
      });
      return;
    }
  };
}

export default PostController;
