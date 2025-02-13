import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post.entity';
import { User } from './User.entity';
import { CommentRating } from './CommentRating.entity';

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false, onDelete: 'CASCADE' })
  post!: Post;

  @ManyToOne(() => User, (user) => user.comments, { nullable: false, onDelete: 'CASCADE' })
  user!: User;

  @Column({ type: 'text' })
  text!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @OneToMany(() => CommentRating, (rating) => rating.comment)
  ratings!: CommentRating[];
}
