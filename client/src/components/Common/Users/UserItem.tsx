import { FC } from 'react';
import { Avatar, Box, Link, Typography } from '@mui/material';
import { Link as LinkRoute } from 'react-router-dom';

import { User } from '~/interface';
import { useAuthContext } from '~/hooks/useAppContext';
import { FollowButton } from '../Buttons';

interface UserItemProps {
  user: User;
}

export const UserItem: FC<UserItemProps> = ({ user }) => {
  const { auth } = useAuthContext();
  let isFollowing = false;

  if (auth?.id) isFollowing = user.followers.includes(auth.id);

  return (
    <Box sx={styles.container}>
      <Avatar src={user.profilePic.url} sx={{ border: '1px solid white' }} alt={user.name} />
      <Box px={2} sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column', flex: 1 }}>
        <Link
          component={LinkRoute}
          to={`/users/${user.username}`}
          sx={styles.textName}
          underline="hover"
        >
          {user.name}
        </Link>
        <Typography fontSize={12} color="#999ea3" component="p">
          @{user.username}
        </Typography>
        <Typography fontSize={12} color="#999ea3" component="span">
          {user?.followers?.length} followers
        </Typography>
      </Box>
      <Box>
        <FollowButton isFollowing={isFollowing || false} userId={user.id} />
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
