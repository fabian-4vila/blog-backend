import { Entity, Unique, Check, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { User } from './User.entity';
import { Comment } from './Comment.entity';

@Entity({ name: 'comment_rating' })
@Unique(['user', 'comment'])
@Check('stars >= 1 AND stars <= 5')
export class CommentRating {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => Comment, (comment) => comment.ratings, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'comment_id' })
  comment!: Comment;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'int' })
  stars!: number;

  @Column({ type: 'boolean' })
  likeDislike!: boolean;
}
