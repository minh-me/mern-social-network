import { Typography } from '@mui/material';
import { User } from 'interface';
import { Link } from 'react-router-dom';

type Props = {
  author: User;
  isPostedBy?: boolean;
};

export const AuthorComment = ({ author, isPostedBy }: Props) => {
  return (
    <Typography
      component={Link}
      to={`users/${author?.username}`}
      fontSize={13}
      color="#fff"
      sx={{
        textDecoration: 'none',
        transition: 'all 0.3',
        '&:hover': {
          textDecoration: 'underline',
        },
        mr: '4px',
        fontWeight: 500,
      }}
    >
      {author?.name}

      {isPostedBy && (
        <Typography
          sx={{
            fontSize: '10px',
            color: 'white',
            background: 'rgb(216 27 96)',
            padding: '1px 2px',
            borderRadius: '2px',
            marginLeft: '4px',
          }}
          component="span"
        >
          Tác giả
        </Typography>
      )}
    </Typography>
  );
};
