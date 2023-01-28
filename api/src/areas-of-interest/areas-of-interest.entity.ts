import {
  PrimaryGeneratedColumn,
  Generated,
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';

import { User } from '../users/user.entity';

@Entity({ name: 'AreasOfInterest' })
export class AreasOfInterest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  isActive: boolean;

  @ManyToMany(() => User)
  users: User[];
}
