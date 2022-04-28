import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

type Props = {};

export const CommentName = (props: Props) => {
  return (
    <Typography
      component={Link}
      to="/profile"
      fontSize={12}
      color="#fff"
      sx={{
        textDecoration: 'none',
        transition: 'all 0.3',
        '&:hover': {
          textDecoration: 'underline',
        },
      }}
    >
      Vidhish Beeharry
    </Typography>
  );
};
