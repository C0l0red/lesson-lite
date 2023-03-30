import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { Role } from '../../users/enums/role.enum';
import { ConfigService } from '@nestjs/config';
import { User } from '../../users/user.schema';
import { Types } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayloadDto): Promise<Partial<User>> {
    return {
      id: payload.sub,
      email: payload.username,
      role: payload.role,
      tutor:
        payload.role === Role.TUTOR
          ? new Types.ObjectId(payload.tutor)
          : undefined,
      student:
        payload.role === Role.STUDENT
          ? new Types.ObjectId(payload.student)
          : undefined,
    };
  }
}
