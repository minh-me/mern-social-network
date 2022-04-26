import { Info } from './paginate.inteface';

export interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
  role?: string;
  coverPhoto?: string;
  profilePic: string;
  authKey?: string;
  follwers?: string[];
  following?: string[];

  createdAt?: string;
  updatedAt?: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';

  createdAt?: string;
  updatedAt?: string;
  dateOfBirth?: string;
  coverPhoto?: String;
  profilePic?: String;
  authKey?: String;
}

export interface UsersResponse {
  info: Info;
  users: UserResponse[];
}
