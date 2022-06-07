import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { User } from '~/interface';

type Props = {
  author: User;
  isPostedBy?: boolean;
  isReplyUser?: boolean;
};

export const AuthorComment = ({ author, isPostedBy, isReplyUser = false }: Props) => {
  return (
    <Typography
      component={Link}
      to={`users/${author.username}`}
      fontSize={13}
      color={isReplyUser ? '#0077ff' : '#fff'}
      sx={styles.AuthorName}
    >
      {author.name}

      {isPostedBy && (
        <Typography sx={styles.Label} component="span">
          Tác giả
        </Typography>
      )}
    </Typography>
  );
};

const styles = {
  AuthorName: {
    textDecoration: 'none',
    transition: 'all 0.3',
    '&:hover': {
      textDecoration: 'underline',
    },
    mr: '4px',
    fontWeight: 500,
  },

  Label: {
    fontSize: '10px',
    color: 'white',
    background: 'rgb(216 27 96)',
    padding: '1px 2px',
    borderRadius: '2px',
    marginLeft: '4px',
  },
};
