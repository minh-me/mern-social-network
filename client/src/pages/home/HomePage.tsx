import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { PostSkeleton, PostTextSkeleton, PostImageSkeleton } from 'components/Common/Variants';
import { Title } from 'components/App';
import { CreatePostForm, PostList } from 'components/Common';
import { usePosts } from 'RQhooks/post.rq';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';

export const HomePage = () => {
  const [limit, setLimit] = useState(8);
  const { ref, inView } = useInView();
  const { data, isLoading, isFetching } = usePosts({ limit });
  const countRef = useRef(0);
  useEffect(() => {
    if (data?.info.totalResults && data.info.totalResults > limit && inView) {
      setLimit((prev) => prev + 6);
    }
  }, [inView, data?.info.totalResults, limit]);

  return (
    <>
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="Home" /> {countRef.current++}
      </Box>

      <CreatePostForm />

      {/* PostList */}
      {isLoading ? (
        <>
          <PostSkeleton />
          <PostTextSkeleton />
          <PostImageSkeleton />
        </>
      ) : (
        data && <PostList data={data} />
      )}

      {/* Button  */}
      <Box mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
        {isFetching ? (
          <CircularProgress size={25} />
        ) : data?.info && data?.info.totalResults > limit ? (
          <Button ref={ref}>Load more</Button>
        ) : null}
      </Box>

      {data?.posts && data?.posts.length === 0 && (
        <Typography textAlign="center" fontSize={16}>
          Nothing to show.
        </Typography>
      )}
    </>
  );
};
