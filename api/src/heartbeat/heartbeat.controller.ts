import { Controller, Get } from '@nestjs/common';

@Controller('heartbeat')
export class HeartbeatController {
  @Get()
  getHeartBeat() {
    return 'Connect-Up Server is up and running!';
  }
}
