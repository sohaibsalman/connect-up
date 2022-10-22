import { Module } from '@nestjs/common';
import { HeartbeatController } from './heartbeat/heartbeat.controller';

@Module({
  imports: [],
  controllers: [HeartbeatController],
  providers: [],
})
export class AppModule {}
