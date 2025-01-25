import { Check, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { User } from './User';

@Entity('qualification_posteo')
@Unique(['usuario', 'posteo'])
@Check('estrellas >= 1 AND estrellas <= 5')
export class QualificationPosteo {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Posteo, (posteo) => posteo.qualification, { nullable: false, onDelete: 'CASCADE' })
  posteo!: Posteo; // Posteo calificado

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  user!: User; // Usuario que realizó la calificación

  @Column({ type: 'int' })
  estrellas!: number; // Número de estrellas (1-5)

  @Column({ type: 'boolean' })
  like_dislike!: boolean; // Indica si es un "me gusta" o "no me gusta"
}
