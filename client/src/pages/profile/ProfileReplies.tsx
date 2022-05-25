import { useState } from 'react';

import { useProfilePosts } from 'RQhooks';
import { limitPosts } from 'contants/pagination';
import { PostSkeleton } from 'components/Common/Variants';
import { PostItem } from 'components/Common';
import { Typography } from '@mui/material';
import { LoadMoreInView } from 'components/Common/Buttons';

export const ProfileReplies = ({ userId = '' }) => {
  const [limit, setLimit] = useState(limitPosts);

  const { data, isLoading, isFetching } = useProfilePosts({
    postedBy: userId,
    limit,
    onlyReply: true,
  });

  if (isLoading || !data) return <PostSkeleton />;
  const { info, posts } = data;

  return (
    <>
      {/* PostList */}
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
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
