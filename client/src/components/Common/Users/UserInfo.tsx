import { Avatar, Box, Typography } from '@mui/material';
import { useAppContext } from 'hooks/useAppContext';

export const UserInfo = () => {
  const { state } = useAppContext();
  const { auth } = state;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar src={auth?.profilePic.url} sx={{ border: '2px solid white' }} alt={auth?.name} />
      <Box px={1}>
        <Typography color="#f91880" fontWeight={700} fontSize={16} component="p">
          {auth?.name}
        </Typography>
        <Typography fontSize={13} color="#999ea3" component="p">
          @{auth?.username}
        </Typography>
      </Box>
    </Box>
  );
};
