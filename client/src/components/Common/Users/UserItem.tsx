import { FC } from 'react';
import { Avatar, Box, Link, Typography } from '@mui/material';
import { UserResponse } from 'interface';
import { FollowButton } from '../Buttons';

interface UserItemProps {
  user: UserResponse;
}

export const UserItem: FC<UserItemProps> = ({ user }) => {
  const isFollowing = user.following?.includes('currentUserId');
  return (
    <Box sx={styles.container}>
      <Avatar src={user.profilePic} sx={{ border: '1px solid white' }} alt={user.name} />
      <Box px={2} sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column', flex: 1 }}>
        <Link sx={styles.textName} underline="hover">
          {user.name}
        </Link>
        <Typography fontSize={12} color="#999ea3" component="p">
          @{user.email.split('@')[0]}
        </Typography>
        <Typography fontSize={12} color="#999ea3" component="span">
          {user?.follwers?.length} followers
        </Typography>
      </Box>
      <Box>
        <FollowButton isActive={isFollowing} />
      </Box>
    </Box>
  );
};

const styles = {
  container: { display: 'flex', alignItems: 'center', width: '100%' },
  userInfoContainer: { display: 'flex', alignItems: 'start', flexDirection: 'column', flex: 1 },
  textName: {
    cursor: 'pointer',
    fontSize: 14,
    color: '#f91880',
    fontWeight: 600,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      color: 'rgba(249, 26, 130, 0.8)',
    },
  },
};
