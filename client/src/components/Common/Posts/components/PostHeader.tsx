import { FC } from 'react';
import { Link as LinkRoute } from 'react-router-dom';
import { Avatar, Box, Link, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Post } from '~/interface';
import { useAuthContext } from '~/hooks/useAppContext';

import { MenuPost } from './MenuPost';

dayjs.extend(relativeTime);

type Props = {
  post: Post;
};

export const PostHeader: FC<Props> = ({ post }) => {
  const { postedBy, createdAt } = post;
  const { auth } = useAuthContext();

  const isOwner = auth?.id === postedBy.id;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        {/* Avatar */}
        <Avatar
          className="avatar"
          src={postedBy.profilePic.url}
          sx={{ border: '1px solid white', mr: 1 }}
          alt={postedBy.name}
        />

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link
              sx={styles.userLinkContainer}
              underline="hover"
              component={LinkRoute}
              to={`/users/${postedBy.username}`}
              className="name"
            >
              {postedBy.name}
            </Link>
            <Typography
              className="username"
              fontSize={12}
              color="#999ea3"
              component="p"
              sx={{ mx: 1 }}
            >
              @{postedBy.username}
            </Typography>
          </Box>
          <Typography className="createdAt" fontSize={12} color="#686868" component="p">
            {dayjs(createdAt).fromNow()}
          </Typography>
          {post.retweetData && (
            <Typography className="desc" fontSize={12} color="#909197" component="p">
              đã chia sẻ bài viết.
            </Typography>
          )}
        </Box>
      </Box>

      {/* Menu options post */}
      {isOwner && <MenuPost post={post} />}
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
