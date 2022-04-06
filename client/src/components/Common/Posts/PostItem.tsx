import { FC } from 'react';
import { Avatar, Box } from '@mui/material';
import { userFroms } from 'pages/search';
import { PostHeader, PostContent, PostFooter } from './components';
import { Post } from 'interface';

const user = userFroms[0];
type PostItemProps = {
  post: Post;
};

export const PostItem: FC<PostItemProps> = ({ post }) => {
  return (
    <Box
      px={2}
      pt={3}
      pb={2}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        maxWidth: '100%',
        borderBottom: '1px solid #38444d',
      }}
    >
      {/* Avatar */}
      <Avatar src={post.user.profilePic} sx={{ border: '1px solid white' }} alt={post.user.name} />

      {/* User info */}
      <Box px={2} sx={{ width: '100%' }}>
        <PostHeader user={post.user} postCreated={post.createdAt} />

        {/* Post Content */}
        <PostContent text={post.text} imageUrl={post.image} />

        {/* post footer */}
        <PostFooter />
      </Box>
    </Box>
  );
};
