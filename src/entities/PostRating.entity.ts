import { Check, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Post } from './Post.entity';
import { User } from './User.entity';

@Entity({ name: 'post_rating' })
@Unique(['user', 'post'])
@Check('stars >= 1 AND stars <= 5')
export class PostRating {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Post, (post) => post.ratings, { nullable: false, onDelete: 'CASCADE' })
  post!: Post; // Posteo calificado

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  user!: User; // Usuario que realizó la calificación

  @Column({ type: 'int' })
  stars!: number; // Número de estrellas (1-5)

  @Column({ type: 'boolean' })
  likeDislike!: boolean; // Indica si es un "me gusta" o "no me gusta"
}
