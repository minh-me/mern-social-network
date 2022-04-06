import { User } from './user.interface';

export interface Post {
  id: string;
  text: string;
  image?: string;
  user: User;
  pinned?: boolean;
  likes?: [string];
  retweetUsers?: [string];
  retweetData?: [string];
  comments?: [string];

  createdAt: string;
  updatedAt?: string;
}
