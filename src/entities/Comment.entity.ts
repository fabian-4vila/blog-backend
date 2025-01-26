import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post.entity';
import { User } from './User.entity';
import { CommentRating } from './CommentRating.entity';

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false, onDelete: 'CASCADE' })
  post!: Post; // Posteo al que pertenece el comentario

  @ManyToOne(() => User, (user) => user.comments, { nullable: false, onDelete: 'CASCADE' })
  user!: User; // Usuario que realizó el comentario

  @Column({ type: 'text' })
  text!: string; // Contenido del comentario

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date; // Fecha de creación del comentario

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date; // Fecha de última actualización

  @OneToMany(() => CommentRating, (rating) => rating.comment)
  ratings!: CommentRating[]; // Calificaciones del comentario
}
