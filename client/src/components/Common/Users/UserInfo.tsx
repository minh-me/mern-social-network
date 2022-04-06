import { FC } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { User } from 'interface';

type Props = {
  user: User;
};

export const UserInfo: FC<Props> = ({ user }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar src={user.profilePic} sx={{ border: '2px solid white' }} alt={user.name} />
      <Box px={1}>
        <Typography color="#f91880" fontWeight={700} fontSize={16} component="p">
          {user.name}
        </Typography>
        <Typography fontSize={13} color="#999ea3" component="p">
          @{user.name}.mchiu
        </Typography>
      </Box>
    </Box>
  );
};
