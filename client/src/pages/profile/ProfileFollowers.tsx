import { Box, Typography } from '@mui/material';
import { blueGrey, pink } from '@mui/material/colors';
import { Link } from 'react-router-dom';

type Props = {};

export const ProfileFollowers = (props: Props) => {
  return (
    <Box px={2} sx={{ display: 'flex' }}>
      <Typography
        component={Link}
        fontSize={15}
        color={blueGrey[400]}
        to="/"
        sx={{
          transition: 'all 0.3s',
          textDecoration: 'none',
          color: blueGrey[400],
          mr: 2,
          '&:hover': { color: pink[400], textDecoration: 'underline' },
        }}
      >
        <Typography component="span" fontWeight={600}>
          0
        </Typography>{' '}
        Following
      </Typography>
      <Typography
        component={Link}
        to="/"
        fontSize={15}
        color={blueGrey[400]}
        sx={{
          transition: 'all 0.3s',
          textDecoration: 'none',
          mr: 2,
          '&:hover': { color: pink[400], textDecoration: 'underline' },
        }}
      >
        <Typography component="span" fontWeight={600}>
          3
        </Typography>{' '}
        Followers
      </Typography>
    </Box>
  );
};
