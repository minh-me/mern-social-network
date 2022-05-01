import { CommentBasic } from './comment.interface';
import { Info } from './paginate.inteface';
import { User } from './user.interface';

export interface Post {
  id: string;
  text: string;
  image?: {
    url: string;
    id?: string;
  };
  postedBy: User;
  pinned?: boolean;
  likes?: string[];
  retweetUsers?: string[];
  retweetData?: string[];
  comments?: CommentBasic[];

  createdAt: string;
  updatedAt?: string;
}

export interface PostsResponse {
  info: Info;
  posts: Post[];
}
