import { Request, Response } from 'express';
import PostService from '../service/post.service';
import { CreatePostDto } from '../../dtos/CreatePostDto';

class PostController {
  private readonly postService: PostService = new PostService();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public getAllPosts = async (_req: Request, res: Response) => {
    try {
      const posts = await this.postService.getAllPosts();
      return res.json(posts);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving posts' });
    }
  };

  public getPostById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const post = await this.postService.getPostById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      return res.json(post);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving post' });
    }
  };

  public createPost = async (req: Request, res: Response) => {
    try {
      const postBody: CreatePostDto = req.body;
      const newPost = await this.postService.createPost(postBody);
      return res.status(201).json(newPost);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating post' });
    }
  };

  public updatePostById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateBody: Partial<CreatePostDto> = req.body;
      const updatedPost = await this.postService.updatePostById(id, updateBody);
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      return res.json(updatedPost);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating post' });
    }
  };

  public deletePostById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedPost = await this.postService.deletePostById(id);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      return res.json({ message: 'Post deleted successfully', deletedPost });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting post' });
    }
  };
}

export default PostController;
