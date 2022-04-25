import { Info } from './paginate.inteface';
import { User } from './user.interface';

export interface Post {
  id: string;
  text: string;
  image?: {
    url: string;
    main?: string;
    thumb2?: string;
    thumb1?: string;
    id?: string;
  };
  postedBy: User;
  pinned?: boolean;
  likes?: [string];
  retweetUsers?: [string];
  retweetData?: [string];
  comments?: [string];

  createdAt: string;
  updatedAt?: string;
}

export interface PostsResponse {
  info: Info;
  posts: Post[];
}
