import { Module } from '@nestjs/common';
import { HeartbeatController } from './heartbeat/heartbeat.controller';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, DbModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [HeartbeatController],
  providers: [],
})
export class AppModule {}
