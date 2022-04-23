import { FC } from 'react';
import { User } from 'interface';
import { Box, Link, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

type PostAuthorProps = {
  user: User;
  postCreated: string;
};

export const PostHeader: FC<PostAuthorProps> = ({ user, postCreated }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
      <Link
        sx={{
          cursor: 'pointer',
          fontSize: 14,
          color: '#f91880',
          textTransform: 'capitalize',
          fontWeight: 700,
          '&:hover': {
            color: 'rgba(249, 26, 130, 0.8)',
          },
        }}
        underline="hover"
      >
        {user.name}
      </Link>
      <Typography fontSize={12} color="#999ea3" component="p" sx={{ mx: 1 }}>
        @{user.email?.split('@')[0]}
      </Typography>
      <Typography fontSize={12} color="#686868" component="p">
        {dayjs(postCreated).fromNow()}
      </Typography>
    </Box>
  );
};
