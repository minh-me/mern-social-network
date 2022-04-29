import { Box } from '@mui/material';
import { User } from 'interface';
import { FC } from 'react';
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
        </Box>
      ))}
    </>
  );
};
