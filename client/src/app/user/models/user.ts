import { Role } from './role.enum';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
}
