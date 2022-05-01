import { FC } from 'react';
import { User } from 'interface';
import { Link as LinkRoute } from 'react-router-dom';
import { Avatar, Box, Link, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

type AuthorPostProps = {
  user: User;
  postCreated: string;
};

export const PostHeader: FC<AuthorPostProps> = ({ user, postCreated }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
      {/* Avatar */}
      <Avatar src={user.profilePic.url} sx={{ border: '1px solid white', mr: 1 }} alt={user.name} />

      <Box>
        <Box sx={{ display: 'flex' }}>
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
            component={LinkRoute}
            to={`/users/${user.username}`}
          >
            {user.name}
          </Link>
          <Typography fontSize={12} color="#999ea3" component="p" sx={{ mx: 1 }}>
            @{user.username}
          </Typography>
        </Box>
        <Typography fontSize={12} color="#686868" component="p">
          {dayjs(postCreated).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};
