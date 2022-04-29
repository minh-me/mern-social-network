import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { UserList } from 'components/Common';
import { UserListSkeleton } from 'components/Common/Variants';
import { useState } from 'react';
import { useUsers } from 'RQhooks';
// import { useInfiniteUsers } from 'RQhooks';

export const Tab_UserList = ({ search = '' }) => {
  // const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteUsers({
  //   search: search,
  //   cacheTime: search ? 2000 : 5 * 60 * 1000,
  // });

  const [limit, setLimit] = useState(6);
  const { data, isFetching, isLoading } = useUsers({ limit, search });

  return (
    <Box px={2}>
      {isFetching ? <UserListSkeleton /> : data?.users && <UserList users={data.users} />}

      <Box mt={2} mb={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        {isLoading ? (
          <CircularProgress size={25} />
        ) : data?.info && data?.info.totalResults > limit ? (
          <Button onClick={() => setLimit((prevLimit) => prevLimit + 6)}>Load more</Button>
        ) : null}
      </Box>

      {data?.users && data?.users.length === 0 && (
        <Typography textAlign="center" fontSize={16}>
          Nothing to show.
        </Typography>
      )}
    </Box>
  );
};
