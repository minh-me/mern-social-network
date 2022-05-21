import { Box, Typography } from '@mui/material';
import { blueGrey, pink } from '@mui/material/colors';
import { Link } from 'react-router-dom';

type Props = {
  followers?: string[];
  following?: string[];
  username?: string;
};

export const ProfileFollowers = ({ followers, following, username }: Props) => {
  return (
    <Box px={2} sx={{ display: 'flex' }}>
      <Typography
        component={Link}
        to={`/users/${username}/following`}
        fontSize={15}
        sx={styles.button}
      >
        <Typography component="span" fontWeight={600}>
          {following && following.length}
        </Typography>{' '}
        Following
      </Typography>
      <Typography
        component={Link}
        to={`/users/${username}/followers`}
        fontSize={15}
        sx={styles.button}
      >
        <Typography component="span" fontWeight={600}>
          {followers && followers.length}
        </Typography>{' '}
        Followers
      </Typography>
    </Box>
  );
};

const styles = {
  button: {
    transition: 'all 0.3s',
    textDecoration: 'none',
    color: blueGrey[400],
    mr: 2,
    '&:hover': { cursor: 'pointer', color: pink[400], textDecoration: 'underline' },
  },
};
