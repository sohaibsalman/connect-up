import {
  PrimaryGeneratedColumn,
  Generated,
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { UserAreasOfInterest } from './user-areas-of-interest.entity';

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

  @OneToMany(
    () => UserAreasOfInterest,
    (userAreaOfInterest) => userAreaOfInterest.areasOfInterest,
  )
  userAreasOfInterest: UserAreasOfInterest;
}
