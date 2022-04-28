import { Box, SxProps, Theme } from '@mui/material';
import { UsersResponse, UserResponse } from 'interface';
import { FC } from 'react';
import { InfiniteData } from 'react-query';
import { UserItem } from './UserItem';
type UserListProps = {
  data: InfiniteData<UsersResponse>;
  sx?: SxProps<Theme>;
};

export const UserList: FC<UserListProps> = ({ data, sx }) => {
  return (
    <>
      {data.pages.map((page) => {
        return page.users.map((user: UserResponse) => (
          <Box
            key={user.id}
            py={2}
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #38444d',
              ...sx,
            }}
          >
            <UserItem key={user.id} user={user} />
          </Box>
        ));
      })}
    </>
  );
};
