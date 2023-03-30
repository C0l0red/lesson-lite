import { Types } from 'mongoose';
import { Role } from '../../users/enums/role.enum';

export class JwtPayloadDto {
  username: string;
  sub: string;
  role: Role;
  tutor?: Types.ObjectId;
  student?: Types.ObjectId;
}
