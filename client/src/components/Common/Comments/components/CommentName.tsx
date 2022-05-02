import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

type Props = {
  name: string;
  username: string;
};

export const CommentName = ({ name, username }: Props) => {
  return (
    <Typography
      component={Link}
      to={`users/${username}`}
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
      {name}
    </Typography>
  );
};
