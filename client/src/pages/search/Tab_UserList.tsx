import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { UserList } from 'components/Common';
import { UserListSkeleton } from 'components/Common/Variants';
import { limitUsers } from 'contants/pagination';
import { useState } from 'react';
import { useUsers } from 'RQhooks';
export const Tab_UserList = ({ search = '' }) => {
  const [limit, setLimit] = useState(limitUsers);
  const { data, isFetching, isLoading } = useUsers({ limit, search });

  return (
    <Box px={2}>
      {isLoading && isFetching ? (
        <UserListSkeleton />
      ) : (
        data?.users && <UserList users={data.users} />
      )}

      <Box mt={2} mb={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        {isFetching ? (
          <CircularProgress size={25} />
        ) : data?.info && data?.info.totalResults > limit ? (
          <Button onClick={() => setLimit((prevLimit) => prevLimit + limitUsers)}>Load more</Button>
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
