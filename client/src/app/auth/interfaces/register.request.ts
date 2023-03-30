import { Role } from '../../user/models/role.enum';

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  role: Role;
}
