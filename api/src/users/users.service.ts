import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, password: string) {
    try {
      const user = this.repo.create({ email, password });
      return await this.repo.save(user);
    } catch (error) {
      throw new BadRequestException('User already exists');
    }
  }

  async findByEmail(email: string) {
    return await this.repo.findOne({ where: { email } });
  }

  async findUser(uuid: string): Promise<User> {
    return await this.repo.findOne({ where: { uuid } });
  }
}
