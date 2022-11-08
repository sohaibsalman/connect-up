import { Module } from '@nestjs/common';

import { AreasOfInterestController } from './areas-of-interest.controller';
import { AreasOfInterestService } from './areas-of-interest.service';

@Module({
  controllers: [AreasOfInterestController],
  providers: [AreasOfInterestService],
  exports: [AreasOfInterestService],
})
export class AreasOfInterestModule {}
