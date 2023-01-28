import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AreasOfInterestController } from './areas-of-interest.controller';
import { AreasOfInterest } from './areas-of-interest.entity';
import { AreasOfInterestService } from './areas-of-interest.service';

@Module({
  imports: [TypeOrmModule.forFeature([AreasOfInterest])],
  controllers: [AreasOfInterestController],
  providers: [AreasOfInterestService],
  exports: [AreasOfInterestService],
})
export class AreasOfInterestModule {}
