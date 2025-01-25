import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Posteo } from './Posteo';
import { User } from './User';

@Entity('comment')
export class comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Posteo, (posteo) => posteo.comments, { nullable: false, onDelete: 'CASCADE' })
  posteo!: Posteo; // Posteo al que pertenece el comentario

  @ManyToOne(() => User, (user) => user.comments, { nullable: false, onDelete: 'CASCADE' })
  user!: User; // Usuario que realizó el comentario

  @Column({ type: 'text' })
  texto!: string; // Contenido del comentario

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en!: Date; // Fecha de creación del comentario

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  actualizado_en!: Date; // Fecha de última actualización
}
