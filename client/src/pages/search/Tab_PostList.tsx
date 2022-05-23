import { useState } from 'react';
import { Typography } from '@mui/material';

import { usePosts } from 'RQhooks';
import { limitPosts } from 'contants/pagination';
import { LoadMoreButton } from 'components/Common/Buttons';
import { PostList } from 'components/Common';
import { PostSkeleton } from 'components/Common/Variants';

export const TabPostList = ({ search = '' }) => {
  const [limit, setLimit] = useState(limitPosts);
  const { data, isLoading, isFetching } = usePosts(
    { limit, search },
    { cacheTime: search ? 1500 : 3 * 60 * 1000 }
  );

  if (isLoading || !data) return <PostSkeleton />;
  const { info, posts } = data;

  return (
    <>
      {/* PostList */}
      {<PostList posts={posts} />}

      {/* Button  */}
      {info && (
        <LoadMoreButton
          isFetching={isFetching}
          limit={limit}
          onChangeLimit={(num) => setLimit(num)}
          totalResults={info.totalResults}
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
