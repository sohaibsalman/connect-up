import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';

import { AuthDto } from './dto/auth.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class AuthService {
  constructor(private dbService: DbService) {}

  /**
   * Function to Sign Up the user
   * @param dto
   * @returns
   */
  async signup(dto: AuthDto) {
    // Generate password hash
    const passwordHash = await argon.hash(dto.password);

    // Create user
    try {
      const user = await this.dbService.user.create({
        data: {
          email: dto.email,
          password: passwordHash,
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
  }

  /**
   * Function to validate the user to sign in
   * @param dto
   * @returns
   */
  async signin(dto: AuthDto) {
    const user = await this.dbService.user.findUnique({
      where: { email: dto.email },
    });

    // Throw exception if user does not exists
    if (!user) throw new NotFoundException('User does not exists');

    // Validate password
    try {
      const isCorrectectPassword = await argon.verify(
        user.password,
        dto.password,
      );

      if (!isCorrectectPassword)
        throw new ForbiddenException('Invalid username or password');
    } catch (error) {
      throw new ForbiddenException('Invalid username or password');
    }

    return user;
  }
}
