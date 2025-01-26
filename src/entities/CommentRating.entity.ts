import { Entity, Unique, Check, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './User.entity';
import { Comment } from './Comment.entity';

@Entity({ name: 'comment_rating' })
@Unique(['user', 'comment'])
@Check('stars >= 1 AND stars <= 5')
export class CommentRating {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Comment, (comment) => comment.ratings, { nullable: false, onDelete: 'CASCADE' })
  comment!: Comment; // Comentario calificado

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  user!: User; // Usuario que realizó la calificación

  @Column({ type: 'int' })
  stars!: number; // Número de estrellas (1-5)

  @Column({ type: 'boolean' })
  likeDislike!: boolean; // Indica si es un "me gusta" o "no me gusta"
}
