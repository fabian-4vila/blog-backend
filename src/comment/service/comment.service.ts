import { Repository } from 'typeorm';
import { Comment } from '../../entities/Comment.entity';
import { AppDataSource } from '../../config/data.source';
import { logger } from '../../utils/logger';
import { CreateCommentDto } from '../../dtos/CreateCommentDto';
import { Post } from '../../entities/Post.entity';
import { User } from '../../entities/User.entity';

class CommentService {
  private CommentRepository: Repository<Comment>;

  constructor() {
    this.CommentRepository = AppDataSource.getRepository(Comment);
  }

  /**
   * Obtener todas los Comment
   */
  public async getAllComments(): Promise<Comment[]> {
    logger.info(`${CommentService.name}-getAllComments`);
    return this.CommentRepository.find({ relations: ['post', 'user'] });
  }

  /**
   * Obtener un Comment por ID
   */
  public async getCommentById(id: string): Promise<Comment | null> {
    logger.info(`${CommentService.name}-getCommentById with id: ${id}`);
    return this.CommentRepository.findOne({ where: { id } });
  }

  /**
   * Crear un Comment
   */
  public async createComment(data: CreateCommentDto): Promise<Comment> {
    logger.info(`${CommentService.name} - createComment`);
    const entityManager = this.CommentRepository.manager;
    const post = await entityManager.findOne(Post, { where: { id: data.postId } });
    if (!post) {
      throw new Error('El post no existe');
    }
    const user = await entityManager.findOne(User, { where: { id: data.userId } });
    if (!user) {
      throw new Error('El usuario no existe');
    }
    const newComment = this.CommentRepository.create({
      post: post, // Relaciones con Post y User
      user: user,
      text: data.text,
    });

    return this.CommentRepository.save(newComment);
  }

  /**
   * Actualizar Comment por ID
   */
  public async updateCommentById(id: string, updateData: Partial<CreateCommentDto>) {
    logger.info(`${CommentService.name}-updateCommentById with id: ${id}`);

    const comment = await this.getCommentById(id);
    if (!comment) return null;

    // Si updateData tiene postId, buscamos el post
    if (updateData.postId) {
      const post = await this.CommentRepository.manager.findOne(Post, { where: { id: updateData.postId } });
      if (!post) throw new Error('El post no existe');
      comment.post = post;
    }

    // Si updateData tiene userId, buscamos el usuario
    if (updateData.userId) {
      const user = await this.CommentRepository.manager.findOne(User, { where: { id: updateData.userId } });
      if (!user) throw new Error('El usuario no existe');
      comment.user = user;
    }

    // Actualizar solo los campos enviados
    Object.assign(comment, updateData);

    return this.CommentRepository.save(comment);
  }

  /**
   * Eliminar Comment por ID
   */
  public async deleteCommentById(id: string) {
    logger.info(`${CommentService.name}-deleteCommentById with id: ${id}`);
    const CommentToDelete = await this.getCommentById(id);
    if (!CommentToDelete) return null;
    await this.CommentRepository.delete(id);
    return CommentToDelete;
  }
}

export default CommentService;
