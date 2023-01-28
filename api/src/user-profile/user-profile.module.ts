import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from './user-profile.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([UserProfile])],
  controllers: [UserProfileController],
  providers: [UserProfileService],
})
export class UserProfileModule {}
