import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AreasOfInterestService } from './areas-of-interest.service';
import { AreasOfInterestDto } from './dto/areasOfInterst.dto';
import { UserAreasOfInterestDto } from './dto/userAreasOfInterest.dto';

@Controller('areas-of-interest')
export class AreasOfInterestController {
  constructor(private areasOfInterestService: AreasOfInterestService) {}

  @Get()
  get() {
    return this.areasOfInterestService.get();
  }

  @Post()
  create(@Body() areasOfInterest: AreasOfInterestDto) {
    return this.areasOfInterestService.create(areasOfInterest);
  }

  @Post('bulk')
  bulkCreate(@Body() areasOfInterest: AreasOfInterestDto[]) {
    return this.areasOfInterestService.bulkCreate(areasOfInterest);
  }

  @Put(':uuid')
  update(@Param() { uuid }, @Body() areasOfInterest: AreasOfInterestDto) {
    return this.areasOfInterestService.update(uuid, areasOfInterest);
  }

  @Delete(':uuid')
  delete(@Param() { uuid }) {
    return this.areasOfInterestService.delete(uuid);
  }

  @Get('user-interests')
  @UseGuards(JwtAuthGuard)
  getAreasOfInterestForUser(@Request() request) {
    return this.areasOfInterestService.getAreasOfInterestForUser(
      request.user.userId,
    );
  }

  @Post('user-interests')
  @UseGuards(JwtAuthGuard)
  updateUserInterests(
    @Request() request,
    @Body() userInterests: UserAreasOfInterestDto,
  ) {
    return this.areasOfInterestService.updateUserInterests(
      request.user.userId,
      userInterests,
    );
  }
}
