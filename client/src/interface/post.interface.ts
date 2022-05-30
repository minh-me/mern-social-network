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
  pinned: boolean;
  hidden: boolean;
  likes: string[];
  retweetUsers: string[];
  retweetData?: Post;
  comments: string[];
  numberLikes: Number;

  createdAt: string;
  updatedAt?: string;
}

export interface PostsResponse {
  info: Info;
  posts: Post[];
}
