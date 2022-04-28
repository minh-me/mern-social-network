import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { UserList } from 'components/Common';
import { UserListSkeleton } from 'components/Common/Variants';
import { useInfiniteUsers } from 'RQhooks';

export const Tab_UserList = ({ search = '' }) => {
  const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteUsers({
    search: search,
    cacheTime: search ? 2000 : 5 * 60 * 1000,
  });

  return (
    <Box px={2}>
      {data?.pages && <UserList data={data} />}

      {isFetching && !isFetchingNextPage ? <UserListSkeleton /> : null}

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
    </Box>
  );
};
