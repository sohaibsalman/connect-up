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

// TODO: Create a custom serializer to send back custom responses
@Controller('areas-of-interest')
export class AreasOfInterestController {
  constructor(private areasOfInterestService: AreasOfInterestService) {}

  @Get()
  async getAllAreasOfInterest() {
    return await this.areasOfInterestService.getAllAreasOfInterest();
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
}
