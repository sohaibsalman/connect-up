import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  Generated,
} from 'typeorm';

import { User } from 'src/users/user.entity';
import { AreasOfInterest } from './areas-of-interest.entity';

@Entity({ name: 'UserAreasOfInterest' })
export class UserAreasOfInterest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @ManyToOne(() => User, (user) => user.userAreaOfInterest)
  user: User;

  @ManyToOne(
    () => AreasOfInterest,
    (areaOfInterest) => areaOfInterest.userAreasOfInterest,
  )
  areasOfInterest: AreasOfInterest;
}
