import { FC } from 'react';
import { Avatar, Box, Button, Link, Typography } from '@mui/material';
import { User } from 'interface';
import { pink } from '@mui/material/colors';

interface Props {
  name: string;
  profilePic: string;
  username: string;
  numFollowers: number;
  isFollowing: boolean;
  following?: string[];
}

export const UserItem: FC<Props> = ({
  name,
  profilePic,
  username,
  numFollowers,
  isFollowing,
  following,
}) => {
  // const isFollowing = following?.includes('currentUserId')
  return (
    <Box sx={styles.container}>
      <Avatar src={profilePic} sx={{ border: '1px solid white' }} alt={name} />
      <Box px={2} sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column', flex: 1 }}>
        <Link
          sx={{
            cursor: 'pointer',
            fontSize: 14,
            color: '#f91880',
            fontWeight: 600,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              color: 'rgba(249, 26, 130, 0.8)',
            },
          }}
          underline="hover"
        >
          {name}
        </Link>
        <Typography fontSize={12} color="#999ea3" component="p">
          @{username}
        </Typography>
        <Typography fontSize={12} color="#999ea3" component="span">
          {numFollowers} follwers
        </Typography>
      </Box>
      <Box>
        {isFollowing ? (
          <Button sx={styles.buttonFollowing} variant="contained">
            Following
          </Button>
        ) : (
          <Button sx={styles.buttonFollow} variant="outlined">
            Follow
          </Button>
        )}
      </Box>
    </Box>
  );
};

const styles = {
  container: { display: 'flex', alignItems: 'center', width: '100%' },
  userInfoContainer: { display: 'flex', alignItems: 'start', flexDirection: 'column', flex: 1 },
  userName: {
    cursor: 'pointer',
    fontSize: 14,
    color: '#f91880',
    fontWeight: 600,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      color: 'rgba(249, 26, 130, 0.8)',
    },
  },
  buttonFollow: {
    color: pink[400],
    borderColor: 'rgb(173 173 173 / 80%)',
    textTransform: 'capitalize',
    borderRadius: 5,
    fontSize: 12,
    padding: '6px 15px',
    '&:hover': {
      borderColor: pink[600],
    },
  },
  buttonFollowing: {
    textTransform: 'capitalize',
    borderRadius: 5,
    fontSize: 12,
    padding: '6px 15px',
    bgcolor: pink[600],
    color: 'white',
    borderColor: 'rgb(173 173 173 / 80%)',
    '&:hover': {
      bgcolor: pink[400],
    },
  },
};
