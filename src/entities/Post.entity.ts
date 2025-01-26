import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';
import { PostRating } from './PostRating.entity';
import { Comment } from './Comment.entity';

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.posts, { nullable: false, onDelete: 'CASCADE' })
  user!: User; // Usuario creador del posteo

  @Column({ type: 'varchar', length: 200 })
  title!: string; // Título del posteo

  @Column({ type: 'text' })
  content!: string; // Contenido del posteo

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date; // Fecha de creación del posteo

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date; // Fecha de última actualización

  @OneToMany(() => Comment, (comment) => comment.post)
  comments!: Comment[]; // Comentarios asociados al posteo

  @OneToMany(() => PostRating, (rating) => rating.post)
  ratings!: PostRating[]; // Calificaciones del posteo

  @Column({ type: 'jsonb', nullable: true })
  files!: { type: string; url: string }[]; // Archivos asociados al posteo (imágenes, PDF, etc.)
}
