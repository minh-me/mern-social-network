import { Box, Typography } from '@mui/material';
import { PostSkeleton, PostTextSkeleton, PostImageSkeleton } from 'components/Common/Variants';
import { Title, LoadMoreInView } from 'components/App';
import { CreatePostForm, PostList } from 'components/Common';
import { usePosts } from 'RQhooks/post.rq';
import { useRef, useState } from 'react';
import { limitPosts } from 'contants/pagination';

export const HomePage = () => {
  const [limit, setLimit] = useState(limitPosts);
  const { data, isLoading, isFetching } = usePosts({ limit }, { cacheTime: 3 * 60 * 1000 });
  const countRef = useRef(0);

  return (
    <>
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="Home" /> {countRef.current++}
      </Box>

      <CreatePostForm />

      {/* PostList */}
      {isLoading && isFetching ? (
        <>
          <PostSkeleton />
          <PostTextSkeleton />
          <PostImageSkeleton />
        </>
      ) : (
        data && <PostList data={data} />
      )}

      {/* Button  */}
      {data?.info && (
        <LoadMoreInView
          isFetching={isFetching}
          limit={limit}
          setLimit={setLimit}
          totalResults={data.info.totalResults}
        />
      )}

      {/* Entries is empty */}
      {data?.posts && data?.posts.length === 0 && (
        <Typography textAlign="center" fontSize={16}>
          Nothing to show.
        </Typography>
      )}
    </>
  );
};
