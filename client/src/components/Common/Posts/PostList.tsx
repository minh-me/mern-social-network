import { FC } from 'react';

import { Post } from '~/interface';
import { PostItem } from './PostItem';

type PostListProps = {
  posts: Post[];
};

export const PostList: FC<PostListProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post: Post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </>
  );
};
