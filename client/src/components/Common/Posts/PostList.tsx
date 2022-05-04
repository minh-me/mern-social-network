import { FC, useRef } from 'react';
import { Post } from 'interface';
import { PostItem } from './PostItem';

type PostListProps = {
  posts: Post[];
};

export const PostList: FC<PostListProps> = ({ posts }) => {
  const ref = useRef(0);
  return (
    <>
      {ref.current++}
      {posts.map((post: Post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </>
  );
};
