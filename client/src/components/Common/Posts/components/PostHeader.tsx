import { FC } from 'react';
import { Link as LinkRoute } from 'react-router-dom';
import { Avatar, Box, Link, Typography } from '@mui/material';

import { User } from 'interface';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAuthContext } from 'hooks/useAppContext';
import { MenuPost } from './MenuPost';
dayjs.extend(relativeTime);

type AuthorPostProps = {
  postedBy: User;
  postId: string;
  hidden: boolean;
  pinned: boolean;
  createdAt: string;
};

export const PostHeader: FC<AuthorPostProps> = ({
  postedBy,
  createdAt,
  postId,
  hidden,
  pinned,
}) => {
  const { auth } = useAuthContext();

  const isOwner = auth?.id === postedBy.id;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        {/* Avatar */}
        <Avatar
          src={postedBy.profilePic.url}
          sx={{ border: '1px solid white', mr: 1 }}
          alt={postedBy.name}
        />

        <Box>
          <Box sx={{ display: 'flex' }}>
            <Link
              sx={styles.userLinkContainer}
              underline="hover"
              component={LinkRoute}
              to={`/users/${postedBy.username}`}
            >
              {postedBy.name}
            </Link>
            <Typography fontSize={12} color="#999ea3" component="p" sx={{ mx: 1 }}>
              @{postedBy.username}
            </Typography>
          </Box>
          <Typography fontSize={12} color="#686868" component="p">
            {dayjs(createdAt).fromNow()}
          </Typography>
        </Box>
      </Box>

      {/* Menu options post */}
      {isOwner && <MenuPost postId={postId} hidden={hidden} pinned={pinned} />}
    </Box>
  );
};

const styles = {
  userLinkContainer: {
    cursor: 'pointer',
    fontSize: 14,
    color: '#f91880',
    textTransform: 'capitalize',
    fontWeight: 700,
    '&:hover': {
      color: 'rgba(249, 26, 130, 0.8)',
    },
  },
};
