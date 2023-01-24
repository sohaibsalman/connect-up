import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { DbService } from '../db/db.service';
import { AreasOfInterestDto } from './dto/areasOfInterst.dto';
import { UserAreasOfInterestDto } from './dto/userAreasOfInterest.dto';
import { UsersService } from '../users/users.service';
import { AreasOfInterest } from './areas-of-interest.entity';

@Injectable()
export class AreasOfInterestService {
  constructor(
    @InjectRepository(AreasOfInterest)
    private repo: Repository<AreasOfInterest>,
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

  async getAreasOfInterestForUser(userUuid: string) {
    try {
      return await this.repo.find({
        where: { userAreasOfInterest: { user: { uuid: userUuid } } },
        relations: { userAreasOfInterest: true },
      });
    } catch (error) {}
  }

  async updateUserInterests(
    userUuid: string,
    userInterests: UserAreasOfInterestDto,
  ) {
    const userId = await this.userService.getUserId(userUuid);
    // Add new interests for user
    const addedResults = await this.addUserInterests(
      userId,
      userInterests.interestsToAdd,
    );

    // Remove existing interests
    const removedResults = await this.removeUserInterests(
      userId,
      userInterests.interestsToRemove,
    );

    return {
      recordsCreated: addedResults,
      recordsDeleted: removedResults,
    };
  }

  async getInterestIds(uuids: string[]) {
    return await this.repo.find({
      where: { uuid: In([...uuids]) },
      select: { id: true },
    });
  }

  async addUserInterests(userId: number, uuids: string[]): Promise<number> {
    // if (uuids.length === 0) return 0;
    // const interestIds = await this.getInterestIds(uuids);
    // const data = interestIds.map((x) => ({
    //   userId,
    //   areasOfInterestId: x.id,
    // }));
    // return (
    //   await this.db.userAreasOfInterest.createMany({
    //     data,
    //     skipDuplicates: true,
    //   })
    // ).count;
    return 0;
  }

  async removeUserInterests(userId: number, uuids: string[]): Promise<number> {
    // if (uuids.length === 0) return 0;
    // const interestIds = await this.getInterestIds(uuids);
    // return (
    //   await this.db.userAreasOfInterest.deleteMany({
    //     where: {
    //       AND: {
    //         userId,
    //         areasOfInterestId: { in: interestIds.map((x) => x.id) },
    //       },
    //     },
    //   })
    // ).count;
    return 0;
  }

  private async findOne(uuid: string) {
    return await this.repo.findOne({ where: { uuid } });
  }
}
