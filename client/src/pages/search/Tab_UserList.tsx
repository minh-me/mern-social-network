import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { UserList } from 'components/Common';
import { UserListSkeleton } from 'components/Common/Variants';
import { limitUsers } from 'contants/pagination';
import { useState } from 'react';
import { useUsers } from 'RQhooks';

export const TabUserList = ({ search = '' }) => {
  const [limit, setLimit] = useState(2);
  const { data, isFetching, isLoading } = useUsers({ limit, search });

  if (isLoading || !data) return <UserListSkeleton />;
  const { users, info } = data;
  return (
    <Box px={2}>
      <UserList users={users} />
      <Box mt={2} mb={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        {isFetching ? (
          <CircularProgress size={25} />
        ) : info.totalResults > limit ? (
          <Button onClick={() => setLimit((prevLimit) => prevLimit + limitUsers)}>Load more</Button>
        ) : null}
      </Box>

      {info.totalResults === 0 && (
        <Typography textAlign="center" fontSize={16}>
          Nothing to show.
        </Typography>
      )}
    </Box>
  );
};
