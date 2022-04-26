import { Box, Button, CircularProgress } from '@mui/material';
import { PostSkeleton, PostTextSkeleton, PostImageSkeleton } from 'components/Common/Variants';
import { Title } from 'components/App';
import { CreatePostForm, PostList } from 'components/Common';
import { useInfinitePosts } from 'RQhooks/post.rq';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export const HomePage = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfinitePosts();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="Home" />
      </Box>
      <Box
        py={2}
        px={2}
        sx={{
          borderBottom: '8px solid #38444d',
          minHeight: 98,
          display: 'flex',
          alignItems: 'start',
        }}
      >
        <CreatePostForm />
      </Box>
      {/* PostList */}
      {data?.pages && <PostList data={data} />}
      <div>
        {isFetching && !isFetchingNextPage ? (
          <>
            <PostSkeleton />
            <PostTextSkeleton />
            <PostImageSkeleton />
          </>
        ) : null}
      </div>
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
