import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { AreasOfInterestDto } from './dto/areasOfInterst.dto';
import { UserAreasOfInterestDto } from './dto/userAreasOfInterest.dto';
import { UsersService } from '../users/users.service';
import { AreasOfInterest } from './areas-of-interest.entity';
import { UserAreasOfInterest } from './user-areas-of-interest.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class AreasOfInterestService {
  constructor(
    @InjectRepository(AreasOfInterest)
    private repo: Repository<AreasOfInterest>,
    @InjectRepository(UserAreasOfInterest)
    private userInterestRepo: Repository<UserAreasOfInterest>,
    private userService: UsersService,
  ) {}

  async getAllAreasOfInterest() {
    return await this.repo.find();
  }

  async create({ title }: AreasOfInterestDto) {
    const areasOfInterest = this.repo.create({ title });
    return await this.repo.save(areasOfInterest);
  }

  async update(uuid: string, attrs: Partial<AreasOfInterest>) {
    const areaOfInterest = await this.findOne(uuid);
    if (!areaOfInterest)
      throw new NotFoundException('Area of interest not found');

    Object.assign(areaOfInterest, attrs);
    return await this.repo.save(areaOfInterest);
  }

  async delete(uuid: any) {
    const areaOfInterest = await this.findOne(uuid);
    if (!areaOfInterest)
      throw new NotFoundException('Area of interest not found');

    return await this.repo.delete(areaOfInterest);
  }

  async bulkCreate(dto: AreasOfInterestDto[]) {
    const areasOfInterestList = this.repo.create(dto);
    return await this.repo.save(areasOfInterestList);
  }

  private async findOne(uuid: string) {
    return await this.repo.findOne({ where: { uuid } });
  }

  private async findMany(uuids: string[]): Promise<AreasOfInterest[]> {
    return await this.repo.find({ where: { uuid: In([...uuids]) } });
  }
}
