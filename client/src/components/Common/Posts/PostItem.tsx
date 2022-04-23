import { FC, useRef, memo } from 'react';
import { Avatar, Box } from '@mui/material';
import { PostHeader, PostContent, PostFooter } from './components';
import { Post } from 'interface';

type PostItemProps = {
  post: Post;
};

export const PostItem: FC<PostItemProps> = memo(({ post }) => {
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
      <Avatar
        src={post.postedBy.profilePic}
        sx={{ border: '1px solid white' }}
        alt={post.postedBy.name}
      />

      {/* User info */}
      <Box px={2} sx={{ width: '100%' }}>
        <PostHeader user={post.postedBy} postCreated={post.createdAt} />

        {/* Post Content */}
        <PostContent text={post.text} imageUrl={post.image} />

        {/* post footer */}
        <PostFooter />
      </Box>
    </Box>
  );
});
