import { Box, SxProps, Theme } from '@mui/material';
import { User } from 'interface';
import { FC } from 'react';
import { UserItem } from './UserItem';
type UserListProps = {
  users: User[];
  sx?: SxProps<Theme>;
};

export const UserList: FC<UserListProps> = ({ users, sx }) => {
  return (
    <>
      {users.map((user) => (
        <Box
          key={user.id}
          py={2}
          px={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #38444d',
            ...sx,
          }}
        >
          <UserItem
            name={user.name}
            username={user.username}
            profilePic={user.profilePic}
            numFollowers={3}
            isFollowing={false}
          />
        </Box>
      ))}
    </>
  );
};
