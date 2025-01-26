import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post.entity';
import { Comment } from './Comment.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  name!: string; // Nombre del usuario

  @Column({ type: 'varchar', length: 150, unique: true })
  email!: string; // Correo electrónico único

  @Column({ type: 'varchar', length: 255 })
  password!: string; // Contraseña del usuario

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registeredAt!: Date; // Fecha de registro del usuario

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date; // Fecha de última actualización

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[]; // Lista de posteos creados por el usuario

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[]; // Lista de comentarios hechos por el usuario
}
