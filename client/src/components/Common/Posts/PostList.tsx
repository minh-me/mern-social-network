import { FC, useEffect, useRef } from 'react';
import { Post } from 'interface';
import { PostItem } from './PostItem';
import { useInfinitePosts } from 'RQhooks/post.rq';
import { Box, Button, CircularProgress } from '@mui/material';
import { useInView } from 'react-intersection-observer';

type PostListProps = {
  posts: Post[];
};

export const PostList: FC<PostListProps> = ({ posts }) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfinitePosts();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  console.log({ inView });

  return (
    <>
      {data?.pages.map((page) => {
        return page.posts.map((post) => <PostItem key={post.id} post={post} />);
      })}

      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      <Box mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
        {isFetchingNextPage ? (
          <CircularProgress size={25} />
        ) : hasNextPage ? (
          <Button ref={ref}>Load more</Button>
        ) : null}
      </Box>
    </>
  );
};
