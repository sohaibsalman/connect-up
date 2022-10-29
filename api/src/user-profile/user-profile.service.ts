import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { DbService } from '../db/db.service';
import { UserProfileDto } from './dto/user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(private db: DbService) {}

  async create(userUuid: string, profile: UserProfileDto) {
    try {
      const userProfile = await this.db.profile.create({
        data: {
          firstName: profile.firstName,
          lastName: profile.lastName,
          dateOfBirth: profile.dateOfBirth,
          gender: profile.gender,
          mobileNumber: profile.mobileNumber,
          avatar: profile.avatar,
          bio: profile.bio,
          headline: profile.headline,
          companyName: profile.companyName,
          companyWebsite: profile.companyWebsite,
          linkedInProfile: profile.linkedInProfile,
          addressCountry: profile.addressCountry,
          addressState: profile.addressState,
          addressCity: profile.addressCity,
          user: {
            connect: {
              uuid: userUuid,
            },
          },
        },
      });
      return { profileId: userProfile.uuid };
    } catch (error) {
      if (error.code === 'P2014') {
        throw new ForbiddenException('User profile already exists');
      }

      throw error;
    }
  }

  async get(uuid: string) {
    try {
      const profile = await this.db.profile.findFirst({
        where: { uuid },
      });
      if (!profile) throw new NotFoundException('User Profile does not exits');

      delete profile.id;
      delete profile.userId;

      return profile;
    } catch (error) {
      throw error;
    }
  }

  async update(uuid: string, profile: UserProfileDto) {
    try {
      const profileInDb = await this.db.profile.findUnique({ where: { uuid } });
      if (!profileInDb)
        throw new NotFoundException('User Profile does not exists');

      const userProfile = await this.db.profile.update({
        data: {
          firstName: profile.firstName,
          lastName: profile.lastName,
          dateOfBirth: profile.dateOfBirth,
          gender: profile.gender,
          mobileNumber: profile.mobileNumber,
          avatar: profile.avatar,
          bio: profile.bio,
          headline: profile.headline,
          companyName: profile.companyName,
          companyWebsite: profile.companyWebsite,
          linkedInProfile: profile.linkedInProfile,
          addressCountry: profile.addressCountry,
          addressState: profile.addressState,
          addressCity: profile.addressCity,
        },
        where: { uuid },
      });
      return { profileId: userProfile.uuid };
    } catch (error) {
      if (error.code === 'P2014') {
        throw new ForbiddenException('User profile already exists');
      }

      throw error;
    }
  }
}
