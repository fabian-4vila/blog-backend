import { Request, Response } from 'express';
import PostService from '../service/post.service';
import { CreatePostDto } from '../../dtos/CreatePostDto';
import { logger } from '../../utils/logger';
import UploadService from '../service/upload.service';

class PostController {
  private readonly postService: PostService = new PostService();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  /**
   * getAllPosts
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
   * getPostById
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
   * createPost
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
      const newPost = await this.postService.createPost(postBody);
      res.status(201).json({
        ok: true,
        post: newPost,
        message: `Successfully created post`,
      });
      return;
    } catch (error) {
      logger.error(`${PostController.name} - Error in CreatePost: ${error}`);
      res.status(500).json({
        ok: false,
        message: 'Error creating post',
      });
      return;
    }
  };

  public updatePostById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateBody: Partial<CreatePostDto> = req.body;
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
        ok: false,
        message: 'Error updating post',
      });
      return;
    }
  };

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
  public uploadPostImage = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
      }
      const imageUrl = await UploadService.uploadFile(req.file);
      res.json({ message: 'Image uploaded', url: imageUrl });
      return;
    } catch (error) {
      res.status(500).json({ message: 'Error uploading file' });
      return;
    }
  };
}

export default PostController;
