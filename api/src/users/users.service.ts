import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  async create(email: string, password: string) {
    try {
      const user = await this.db.user.create({
        data: {
          email,
          password,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('User already exists');
        throw error;
      }
    }

    return null;
  }

  async findyByEmail(email: string) {
    return await this.db.user.findUnique({
      where: { email },
    });
  }
}
