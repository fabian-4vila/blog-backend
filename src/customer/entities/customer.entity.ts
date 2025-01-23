import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { TestimonialEntity } from '../../testimonial/entities/testimonial.entity';
@Entity({ name: 'customer' })
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  createdAt!: Date;

  @Column()
  updateAt!: Date;

  @OneToOne(() => UserEntity, (user) => user.customer)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @OneToMany(() => TestimonialEntity, (testimonial) => testimonial.customer)
  testimonials!: TestimonialEntity[];
}
