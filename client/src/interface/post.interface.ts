export interface Post {
  text: string;
  image?: string;
  postedBy: string;
  pinned?: boolean;
  likes?: [string];
  retweetUsers?: [string];
  retweetData?: [string];
  comments?: [string];

  createdAt?: string;
  updatedAt?: string;
}
