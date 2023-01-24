import { BadRequestException, Injectable } from '@nestjs/common';

import { AreasOfInterestService } from '../areas-of-interest/areas-of-interest.service';
import { DbService } from '../db/db.service';
import { SearchBy } from './enums/search-by.enum';
import { ProfileDiscoveryDto } from './dto/profileDiscovery.dto';

@Injectable()
export class ProfileDiscoveryService {
  constructor(
    private db: DbService,
    private areaOfInterestService: AreasOfInterestService,
  ) {}

  async discoverProfiles(userUuid: string, params: ProfileDiscoveryDto) {
    if (params.searchParams.by == SearchBy.AREA_OF_INTEREST)
      return this.searchByAreasOfInterest(userUuid, params.searchParams.values);
  }

  /**
   * Function to search user profiles by areas of interests
   */
  private async searchByAreasOfInterest(
    userUuid: string,
    areaOfInterests: string[],
  ) {
    try {
      const interestIds = await this.areaOfInterestService.getInterestIds(
        areaOfInterests,
      );

      const profiles = await this.db.profile.findMany({
        where: {
          user: {
            AND: {
              uuid: { not: userUuid }, // To exclude current user from profile search
              UserAreasOfInterest: {
                some: {
                  areasOfInterestId: { in: interestIds.map((x) => x.id) },
                },
              },
            },
          },
        },
      });

      return profiles;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
