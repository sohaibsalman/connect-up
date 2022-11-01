import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DbService } from '../db/db.service';
import { AreasOfInterestDto } from './dto/areasOfInterst.dto';
import { UserAreasOfInterestDto } from './dto/userAreasOfInterest.dto';
import { UsersService } from '..//users/users.service';

@Injectable()
export class AreasOfInterestService {
  constructor(private db: DbService, private userService: UsersService) {}

  async get() {
    try {
      return await this.db.areasOfInterest.findMany({
        select: { uuid: true, title: true },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async create(areasOfInterest: AreasOfInterestDto) {
    try {
      const areas = await this.db.areasOfInterest.create({
        data: {
          title: areasOfInterest.title,
        },
      });

      return { uuid: areas.uuid, title: areas.title };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(uuid: any, areasOfInterest: AreasOfInterestDto) {
    try {
      const areas = await this.db.areasOfInterest.update({
        data: { title: areasOfInterest.title },
        where: { uuid },
      });

      return { uuid: areas.uuid };
    } catch (error) {
      if (error.code === 'P2025')
        throw new NotFoundException('Area of Interest does not exists');
      throw new BadRequestException(error);
    }
  }

  async delete(uuid: any) {
    try {
      await this.db.areasOfInterest.delete({ where: { uuid } });
    } catch (error) {
      if (error.code === 'P2025')
        throw new NotFoundException('Area of Interest does not exists');
      throw new BadRequestException(error);
    }
  }

  async bulkCreate(areasOfInterest: AreasOfInterestDto[]) {
    const data = Array.from(areasOfInterest).map((x) => ({
      title: x.title,
    }));
    try {
      const areas = await this.db.areasOfInterest.createMany({
        data,
      });
      return { recordsCreated: areas.count };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getAreasOfInterestForUser(userUuid: string) {
    try {
      return await this.db.areasOfInterest.findMany({
        where: { UserAreasOfInterest: { some: { user: { uuid: userUuid } } } },
      });
    } catch (error) {}
  }

  async updateUserInterests(
    userUuid: string,
    userInterests: UserAreasOfInterestDto,
  ) {
    try {
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
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getInterestId(uuids: string[]) {
    return await this.db.areasOfInterest.findMany({
      where: { uuid: { in: uuids } },
      select: { id: true },
    });
  }

  async addUserInterests(userId: number, uuids: string[]): Promise<number> {
    if (uuids.length === 0) return 0;

    const interestIds = await this.getInterestId(uuids);
    const data = interestIds.map((x) => ({
      userId,
      areasOfInterestId: x.id,
    }));

    return (
      await this.db.userAreasOfInterest.createMany({
        data,
        skipDuplicates: true,
      })
    ).count;
  }

  async removeUserInterests(userId: number, uuids: string[]): Promise<number> {
    if (uuids.length === 0) return 0;

    const interestIds = await this.getInterestId(uuids);
    return (
      await this.db.userAreasOfInterest.deleteMany({
        where: {
          AND: {
            userId,
            areasOfInterestId: { in: interestIds.map((x) => x.id) },
          },
        },
      })
    ).count;
  }
}
