import { Info } from './paginate.inteface';

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;

  role?: 'admin' | 'user';
  dateOfBirth?: string;
  coverPhoto?: {
    url: string;
    pc?: string;
    mobile?: string;
  };
  profilePic: {
    url: string;
  };
  authKey?: string;

  followers: string[];
  following: string[];
  numberFollowers?: string;

  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends Omit<User, 'followers' | 'following'> {
  followers: User[];
  following: User[];
}

export interface UsersResponse {
  info: Info;
  users: User[];
}
