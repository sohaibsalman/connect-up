import {
  Column,
  PrimaryGeneratedColumn,
  Generated,
  Entity,
  OneToOne,
} from 'typeorm';

import { User } from '../users/user.entity';

@Entity({ name: 'UserProfile' })
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ default: '' })
  avatar: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dateOfBirth: string;

  @Column()
  mobileNumber: string;

  @Column()
  gender: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  headline: string;

  @Column()
  companyName: string;

  @Column({ default: '' })
  companyWebsite: string;

  @Column()
  linkedInProfile: string;

  @Column()
  addressCountry: string;

  @Column()
  addressState: string;

  @Column()
  addressCity: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
