import { Info } from './paginate.inteface';
import { Post } from './post.interface';
import { User } from './user.interface';

export interface Comment {
  id: string;
  text?: string;
  author: User;
  post: Post;
  replyTo?: User;
  parentId?: string;
  image?: {
    url: string;
  };
  likes: string[];

  createdAt: string;
  updatedAt?: string;
}

export interface CommentsResponse {
  comments: Comment[];
  info: Info;
}
