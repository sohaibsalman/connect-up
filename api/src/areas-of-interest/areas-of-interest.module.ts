import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AreasOfInterestController } from './areas-of-interest.controller';
import { AreasOfInterest } from './areas-of-interest.entity';
import { AreasOfInterestService } from './areas-of-interest.service';
import { UserAreasOfInterest } from './user-areas-of-interest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AreasOfInterest, UserAreasOfInterest])],
  controllers: [AreasOfInterestController],
  providers: [AreasOfInterestService],
  exports: [AreasOfInterestService],
})
export class AreasOfInterestModule {}
