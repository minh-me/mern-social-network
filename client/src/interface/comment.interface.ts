import { Info } from './paginate.inteface';
import { User } from './user.interface';

export interface Comment {
  id: string;
  text: string;
  user: User;
  post: string;
  reply?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface CommentsResponse {
  comments: Comment[];
  info: Info;
}
