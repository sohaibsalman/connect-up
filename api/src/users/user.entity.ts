import {
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { AreasOfInterest } from '../areas-of-interest/areas-of-interest.entity';
import { UserProfile } from '../user-profile/user-profile.entity';

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

  @ManyToMany(() => AreasOfInterest)
  @JoinTable({ name: 'UserAreasOfInterest' })
  areasOfInterest: AreasOfInterest[];
}
