import { Injectable } from '@nestjs/common';

import { SignupDto } from './dto/signup.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AuthService {
  constructor(private dbService: DbService) {}

  async signup(signupDto: SignupDto) {
    const { email, password } = signupDto;
    const user = await this.dbService.user.create({
      data: {
        email,
        password,
      },
    });
    return user;
  }
}
