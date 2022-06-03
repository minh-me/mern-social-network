import { FC } from 'react';
import { Box } from '@mui/material';

import { User } from '~/interface';
import { UserItem } from './UserItem';

type UserListProps = {
  users: User[];
};

export const UserList: FC<UserListProps> = ({ users }) => {
  return (
    <>
      {users.map((user) => (
        <Box
          key={user.id}
          py={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #38444d',
          }}
        >
          <UserItem key={user.id} user={user} />

          {/* <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' },}>
            <UserItem key={user.id} user={user} />
            <Box>
              <FollowButton isFollowing={isFollowing || false} userId={user.id} />
            </Box>
          </Box> */}
        </Box>
      ))}
    </>
  );
};
