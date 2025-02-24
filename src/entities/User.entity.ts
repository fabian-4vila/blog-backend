import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post.entity';
import { Comment } from './Comment.entity';
import { RoleType } from '../types/Role.type';
import { RolePermissions } from '../types/RolePermissions';
import { Exclude } from 'class-transformer';
import { hashPassword } from '../utils/hash';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email!: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Exclude()
  @Column({ type: 'enum', enum: RoleType, default: RoleType.SUBSCRIBED })
  role!: RoleType;

  @Exclude()
  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  permissions!: string[];

  @Exclude()
  @Column({ type: 'boolean', default: false })
  verified!: boolean;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registeredAt!: Date;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @OneToMany(() => Post, (post) => post.user)
  post!: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];

  @BeforeInsert()
  async beforeInsertActions() {
    this.password = await hashPassword(this.password);
    this.setDefaultPermissions();
  }

  private setDefaultPermissions() {
    this.permissions = RolePermissions[this.role] || [];
  }
}
