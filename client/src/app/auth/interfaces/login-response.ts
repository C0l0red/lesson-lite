import { UserProfile } from '../../shared/interfaces/user-profile';

export interface LoginResponse {
  token: string;
  user: UserProfile;
}
