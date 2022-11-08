import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProfileDiscoveryDto } from './dto/profileDiscovery.dto';
import { ProfileDiscoveryService } from './profile-discovery.service';

@Controller('profile-discovery')
export class ProfileDiscoveryController {
  constructor(private profileDiscoveryService: ProfileDiscoveryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  discoverProfiles(@Request() request, @Body() dto: ProfileDiscoveryDto) {
    return this.profileDiscoveryService.discoverProfiles(
      request.user.userId,
      dto,
    );
  }
}
