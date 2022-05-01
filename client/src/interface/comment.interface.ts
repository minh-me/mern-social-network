import { Info } from './paginate.inteface';
import { User } from './user.interface';

export interface Comment {
  content: string;
  user: User;
  post: string;
  reply?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface CommentBasic extends Omit<Comment, 'user'> {
  user: string;
}

export interface CommentsResponse {
  comment: Comment;
  info: Info;
}
