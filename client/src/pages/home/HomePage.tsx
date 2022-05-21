import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { PostSkeleton, PostTextSkeleton, PostImageSkeleton } from 'components/Common/Variants';
import { Title, LoadMoreInView } from 'components/App';
import { CreatePostForm, PostList } from 'components/Common';
import { usePosts } from 'RQhooks/post.rq';
import { limitPosts } from 'contants/pagination';

export const HomePage = () => {
  const [limit, setLimit] = useState(limitPosts);
  const { data, isLoading, isFetching } = usePosts({ limit }, { cacheTime: 3 * 60 * 1000 });

  if (isLoading || !data)
    return (
      <>
        <PostSkeleton />
        <PostTextSkeleton />
        <PostImageSkeleton />
      </>
    );

  const { info, posts } = data;

  return (
    <>
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="Home" />
      </Box>

      <CreatePostForm />

      <PostList posts={posts} />

      {/* Button  */}
      {info && (
        <LoadMoreInView
          isFetching={isFetching}
          limit={limit}
          onChangeLimit={(number) => setLimit(number)}
          totalResults={data.info.totalResults}
        />
      )}

      {/* Entries is empty */}
      {posts && posts.length === 0 && (
        <Typography textAlign="center" fontSize={16}>
          Nothing to show.
        </Typography>
      )}
    </>
  );
};
