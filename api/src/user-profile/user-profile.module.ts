import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';

@Module({
  imports: [UsersModule],
  controllers: [UserProfileController],
  providers: [UserProfileService],
})
export class UserProfileModule {}
