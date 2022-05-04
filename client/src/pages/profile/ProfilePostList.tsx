import { useRef, useState } from 'react';
import { Typography } from '@mui/material';

import { usePosts } from 'RQhooks';
import { limitPosts } from 'contants/pagination';
import { LoadMoreInView } from 'components/App';
import { PostList } from 'components/Common';
import { PostSkeleton } from 'components/Common/Variants';

export const ProfilePostList = ({ userId = '' }) => {
  const [limit, setLimit] = useState(limitPosts);
  const { data, isLoading, isFetching } = usePosts({ postedBy: userId, limit });

  const countRef = useRef(0);
  if (isLoading || !data) return <PostSkeleton />;
  const { info, posts } = data;

  return (
    <>
      {/* PostList */}
      {<PostList posts={posts} />}
      {countRef.current++}

      {/* Button  */}
      {info && (
        <LoadMoreInView
          isFetching={isFetching}
          limit={limit}
          setLimit={setLimit}
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
