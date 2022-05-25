import { useState } from 'react';
import { Typography } from '@mui/material';

import { useProfilePosts } from 'RQhooks';
import { limitPosts } from 'contants/pagination';
import { LoadMoreInView } from 'components/Common/Buttons';
import { PostList } from 'components/Common';
import { PostSkeleton } from 'components/Common/Variants';

export const ProfilePostList = ({ userId = '' }) => {
  const [limit, setLimit] = useState(limitPosts);
  const { data, isLoading, isFetching } = useProfilePosts({ postedBy: userId, limit });

  if (isLoading || !data) return <PostSkeleton />;
  const { info, posts } = data;

  return (
    <>
      {/* PostList */}
      {<PostList posts={posts} />}

      {/* Button  */}
      {info && (
        <LoadMoreInView
          isFetching={isFetching}
          limit={limit}
          onChangeLimit={(num) => setLimit(num)}
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
