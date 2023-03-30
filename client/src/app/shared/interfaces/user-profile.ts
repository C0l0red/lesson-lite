import { Role } from '../../user/models/role.enum';

export interface UserProfile {
  _id: string;
  fullName: string;
  email: string;
  role: Role;
}
