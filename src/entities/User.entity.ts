import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post.entity';
import { Comment } from './Comment.entity';
import { RoleType } from '../types/Role.type';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string; // Nombre

  @Column({ type: 'varchar', length: 150, unique: true })
  email!: string; // Correo

  @Column({ type: 'varchar', length: 255 })
  password!: string; // Contraseña

  @Column({ type: 'enum', enum: RoleType, default: RoleType.GENERAL })
  role!: RoleType;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registeredAt!: Date; // Fecha de registro

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date; // Fecha de última actualización

  @OneToMany(() => Post, (post) => post.user)
  post!: Post[]; // Lista de posteos creados

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[]; // Lista de comentarios hechos
}
