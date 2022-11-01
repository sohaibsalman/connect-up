import { Module } from '@nestjs/common';

import { AreasOfInterestModule } from '../areas-of-interest/areas-of-interest.module';
import { ProfileDiscoveryController } from './profile-discovery.controller';
import { ProfileDiscoveryService } from './profile-discovery.service';

@Module({
  imports: [AreasOfInterestModule],
  controllers: [ProfileDiscoveryController],
  providers: [ProfileDiscoveryService],
})
export class ProfileDiscoveryModule {}
