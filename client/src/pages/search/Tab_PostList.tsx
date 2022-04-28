import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { PostList } from 'components/Common';
import { PostListSkeleton } from 'components/Common/Variants';
import { useInfinitePosts } from 'RQhooks';

export const Tab_PostList = ({ search = '' }) => {
  const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfinitePosts({
    search: search,
    cacheTime: search ? 2000 : 5 * 60 * 1000,
  });

  return (
    <>
      {data?.pages && <PostList data={data} />}

      {isFetching && !isFetchingNextPage ? <PostListSkeleton /> : null}

      <Box mt={2} mb={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        {isFetchingNextPage ? (
          <CircularProgress size={25} />
        ) : hasNextPage ? (
          <Button onClick={() => fetchNextPage()}>Load more</Button>
        ) : null}
      </Box>

      {data?.pages && data?.pages[0].info.totalResults === 0 && (
        <Typography textAlign="center" fontSize={16}>
          Nothing to show.
        </Typography>
      )}
    </>
  );
};
