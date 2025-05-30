import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Post } from './Post.entity';
import { User } from './User.entity';

@Entity({ name: 'post_rating' })
@Unique(['user', 'post'])
@Check('stars >= 1 AND stars <= 5')
export class PostRating {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => Post, (post) => post.ratings, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'int' })
  stars!: number;

  @Column({ type: 'boolean' })
  likeDislike!: boolean;
}
