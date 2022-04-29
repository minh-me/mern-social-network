import { FC, memo, useRef } from 'react';
import { Post, PostsResponse } from 'interface';
import { PostItem } from './PostItem';

type PostListProps = {
  data: PostsResponse;
};

export const PostList: FC<PostListProps> = memo(({ data }) => {
  const ref = useRef(0);
  return (
    <>
      {ref.current++}
      {data.posts.map((post: Post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </>
  );
});
