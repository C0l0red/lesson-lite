import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user: User = await this.usersService.findByEmail(email);
    if (user && (await this.usersService.verifyPassword(user, password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayloadDto = {
      username: user.email,
      sub: user.id,
      role: user.role,
      student: user.student?._id as Types.ObjectId,
      tutor: user.tutor?._id as Types.ObjectId,
    };

    return {
      token: await this.jwtService.signAsync(payload),
      user: {
        _id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        student: user.student,
        tutor: user.tutor,
      },
    };
  }
}
