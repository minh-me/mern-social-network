import { useRef, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { PostList } from 'components/Common';
import { PostSkeleton } from 'components/Common/Variants';

import { usePosts } from 'RQhooks';

export const Tab_PostList = ({ search = '' }) => {
  const [limit, setLimit] = useState(6);
  const { data, isLoading, isFetching } = usePosts(
    { limit, search },
    { cacheTime: search ? 1500 : 5 * 60 * 1000 }
  );

  const countRef = useRef(0);
  return (
    <>
      {}
      {/* PostList */}
      {isLoading ? <PostSkeleton /> : data && <PostList data={data} />}
      {countRef.current++}
      {/* Button  */}
      <Box mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
        {isFetching ? (
          <CircularProgress size={25} />
        ) : data?.info && data?.info.totalResults > limit ? (
          <Button onClick={() => setLimit((prevLimit) => prevLimit + 6)}>Load more</Button>
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
