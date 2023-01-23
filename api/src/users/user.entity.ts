import {
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { UserProfile } from '../user-profile/user-profile.entity';
import { UserAreasOfInterest } from '../areas-of-interest/user-areas-of-interest.entity';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  isActive: boolean;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  @JoinColumn()
  profile: UserProfile;

  @OneToMany(
    () => UserAreasOfInterest,
    (userAreaOfInterest) => userAreaOfInterest.user,
  )
  userAreaOfInterest: UserAreasOfInterest[];
}
