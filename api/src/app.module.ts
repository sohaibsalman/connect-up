import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HeartbeatController } from './heartbeat/heartbeat.controller';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { AreasOfInterestModule } from './areas-of-interest/areas-of-interest.module';
import { ProfileDiscoveryModule } from './profile-discovery/profile-discovery.module';

@Module({
  imports: [
    AuthModule,
    DbModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DATABASE_URL'),
          synchronize: true,
        };
      },
    }),
    UsersModule,
    UserProfileModule,
    AreasOfInterestModule,
    ProfileDiscoveryModule,
  ],
  controllers: [HeartbeatController],
  providers: [],
})
export class AppModule {}
