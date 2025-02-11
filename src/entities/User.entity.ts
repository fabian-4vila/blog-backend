import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post.entity';
import { Comment } from './Comment.entity';
import { RoleType } from '../types/Role.type';
import { Exclude } from 'class-transformer';
import { hashPassword } from '../utils/hash';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid') // Usar UUID en lugar de un número autoincremental
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email!: string;

  @Exclude() // Excluye la contraseña al serializar la entidad
  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @BeforeInsert()
  async encryptPassword() {
    this.password = await hashPassword(this.password);
  }

  @Column({ type: 'enum', enum: RoleType, default: RoleType.SUBSCRIBED })
  role!: RoleType;

  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  permissions!: string[]; // Lista de permisos específicos del usuario

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registeredAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @OneToMany(() => Post, (post) => post.user)
  post!: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];
}
