import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';
import { PostRating } from './PostRating.entity';
import { Comment } from './Comment.entity';

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => User, (user) => user.post, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
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

  @Column({ type: 'jsonb', nullable: false, default: () => "'[]'::jsonb" })
  files!: { type: string; url: string }[]; // Archivos asociados al posteo (imágenes, PDF, etc.)
}
