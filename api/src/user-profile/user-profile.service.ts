import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { UserProfileDto } from './dto/user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor() {}

  async create(userUuid: string, profile: UserProfileDto) {}

  async get(uuid: string) {}

  async update(uuid: string, profile: UserProfileDto) {}
}
