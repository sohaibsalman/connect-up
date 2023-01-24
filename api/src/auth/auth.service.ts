import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: AuthDto) {
    const passwordHash = await argon.hash(dto.password);
    const user = await this.userService.create(dto.email, passwordHash);
    return { userId: user.uuid, ...this.generateJwtToken(user) };
  }

  login(user: User) {
    return this.generateJwtToken(user);
  }

  async validateUser(dto: AuthDto) {
    const user = await this.userService.findByEmail(dto.email);

    // Throw exception if user does not exists
    if (!user) throw new NotFoundException('User does not exists');

    // Validate password
    try {
      const isPasswordCorrect = await argon.verify(user.password, dto.password);

      if (!isPasswordCorrect)
        throw new ForbiddenException('Invalid username or password');
    } catch (error) {
      throw new ForbiddenException('Invalid username or password');
    }

    return user;
  }

  private generateJwtToken(user: User) {
    const payload = { email: user.email, sub: user.uuid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
