import { Avatar, Box, Typography } from '@mui/material';
import { useAppContext } from 'hooks/useAppContext';

export const UserInfo = () => {
  const {
    state: { auth },
  } = useAppContext();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar
        src={auth?.user.profilePic.url}
        sx={{ border: '2px solid white' }}
        alt={auth?.user.name}
      />
      <Box px={1}>
        <Typography color="#f91880" fontWeight={700} fontSize={16} component="p">
          {auth?.user.name}
        </Typography>
        <Typography fontSize={13} color="#999ea3" component="p">
          @{auth?.user.username}
        </Typography>
      </Box>
    </Box>
  );
};
