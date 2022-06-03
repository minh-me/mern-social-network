import { useState } from 'react';
import { Box, Typography } from '@mui/material';

import { LoadMoreButton } from '~/components/Common/Buttons';
import { UserItem } from '~/components/Common';
import { UserListSkeleton } from '~/components/Common/Variants';
import { limitUsers } from '~/constants/pagination';
import { User } from '~/interface';
import { useUsers } from '~/RQhooks';

type Props = {
  handleAddUsersSelected: (user: User) => void;
  usersSelected: User[];
  search: string;
};

export const ChatUserList = ({ search, handleAddUsersSelected, usersSelected }: Props) => {
  const [limit, setLimit] = useState(limitUsers);

  const { data, isFetching, isLoading } = useUsers({ limit, search }, { cacheTime: 1 * 60 * 1000 });

  if (isLoading || !data) return <UserListSkeleton />;

  const { users, info } = data;

  return (
    <Box px={2}>
      {users
        .filter((user: User) => !usersSelected.includes(user))
        .map((user: User) => {
          return (
            <Box
              onClick={() => handleAddUsersSelected(user)}
              key={user.id}
              py={2}
              px={2}
              sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #38444d' }}
            >
              <UserItem user={user} />
            </Box>
          );
        })}

      <LoadMoreButton
        isFetching={isFetching}
        totalResults={info.totalResults}
        limit={limit}
        onChangeLimit={(limit: number) => setLimit(limit)}
      />

      {users && users.length === 0 && (
        <Typography textAlign="center" fontSize={16}>
          Nothing to show.
        </Typography>
      )}
    </Box>
  );
};
