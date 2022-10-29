import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HeartbeatController } from './heartbeat/heartbeat.controller';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { AreasOfInterestModule } from './areas-of-interest/areas-of-interest.module';

@Module({
  imports: [
    AuthModule,
    DbModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    UserProfileModule,
    AreasOfInterestModule,
  ],
  controllers: [HeartbeatController],
  providers: [],
})
export class AppModule {}
