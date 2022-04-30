import { useRef, useState } from 'react';
import { Typography } from '@mui/material';

import { usePosts } from 'RQhooks';
import { limitPosts } from 'contants/pagination';
import { LoadMoreButton } from 'components/App';
import { PostList } from 'components/Common';
import { PostSkeleton } from 'components/Common/Variants';

export const Tab_PostList = ({ search = '' }) => {
  const [limit, setLimit] = useState(limitPosts);
  const { data, isLoading, isFetching } = usePosts(
    { limit, search },
    { cacheTime: search ? 1500 : 3 * 60 * 1000 }
  );

  const countRef = useRef(0);
  return (
    <>
      {/* PostList */}
      {isLoading && isFetching ? <PostSkeleton /> : data && <PostList data={data} />}
      {countRef.current++}

      {/* Button  */}
      {data?.info && (
        <LoadMoreButton
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
