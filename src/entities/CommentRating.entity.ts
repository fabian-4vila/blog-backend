import { Entity, Unique, Check, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './User.entity';
import { Comment } from './Comment.entity';

@Entity({ name: 'comment_rating' })
@Unique(['user', 'comment'])
@Check('stars >= 1 AND stars <= 5')
export class CommentRating {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => Comment, (comment) => comment.ratings, { nullable: false, onDelete: 'CASCADE' })
  comment!: Comment;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  user!: User;

  @Column({ type: 'int' })
  stars!: number;

  @Column({ type: 'boolean' })
  likeDislike!: boolean;
}
