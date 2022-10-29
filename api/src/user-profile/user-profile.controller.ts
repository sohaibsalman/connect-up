import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Put,
  Param,
  Get,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserProfileService } from './user-profile.service';
import { UserProfileDto } from './dto/user-profile.dto';

@Controller('user-profile')
export class UserProfileController {
  constructor(private userProfileService: UserProfileService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  create(@Request() req: any, @Body() dto: UserProfileDto) {
    return this.userProfileService.create(req.user.userId, dto);
  }

  @Get('get/:uuid')
  @UseGuards(JwtAuthGuard)
  get(@Param() { uuid }) {
    return this.userProfileService.get(uuid);
  }

  @Put('update/:uuid')
  @UseGuards(JwtAuthGuard)
  update(@Param() { uuid }, @Body() dto: UserProfileDto) {
    return this.userProfileService.update(uuid, dto);
  }
}
