import { Module } from '@nestjs/common';
import { HeartbeatController } from './heartbeat/heartbeat.controller';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, DbModule, ConfigModule.forRoot({ isGlobal: true }), UsersModule],
  controllers: [HeartbeatController],
  providers: [],
})
export class AppModule {}
