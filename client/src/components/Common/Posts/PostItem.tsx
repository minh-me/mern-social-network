import { FC, memo } from 'react';
import { Box, Divider } from '@mui/material';
import { PostHeader, PostContent, PostFooter } from './components';
import { Post } from 'interface';
import { CommentList } from '../Comments';

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
      {/* User info */}
      <Box px={2} sx={{ width: '100%' }}>
        <PostHeader user={post.postedBy} postCreated={post.createdAt} />

        {/* Post Content */}
        <PostContent text={post.text} imageUrl={post.image?.url} />

        {/* post footer */}

        <PostFooter likes={post?.likes} comments={post?.comments} shares={post?.retweetUsers} />
        {/* Comment */}
        {/* <Box>
          <Divider sx={{ bgcolor: '#38444d', my: 2 }} />
          <CommentList />
        </Box> */}
      </Box>
    </Box>
  );
});
