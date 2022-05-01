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

  follwers?: string[];
  following?: string[];

  createdAt?: string;
  updatedAt?: string;
}

export interface UsersResponse {
  info: Info;
  users: User[];
}
