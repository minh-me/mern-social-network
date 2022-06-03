import { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

import { UserList } from '~/components/Common';
import { UserListSkeleton } from '~/components/Common/Variants';
import { limitUsers } from '~/constants/pagination';
import { useUsers } from '~/RQhooks';

export const TabUserList = ({ search = '', sort = '-createdAt', limit = limitUsers }) => {
  const [sizeLimit, setSizeLimit] = useState(limit);

  const { data, isFetching, isLoading } = useUsers({ limit: sizeLimit, search, sort });

  if (isLoading || !data) return <UserListSkeleton />;

  const { users, info } = data;

  return (
    <Box px={2}>
      <UserList users={users} />
      <Box mt={2} mb={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        {isFetching ? (
          <CircularProgress size={25} />
        ) : info.totalResults > sizeLimit ? (
          <Button
            onClick={() =>
              setSizeLimit((prevLimit: number) => {
                return prevLimit + limitUsers;
              })
            }
          >
            Load more
          </Button>
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
