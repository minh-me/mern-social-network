import { FC, memo, useState } from 'react';
import { Box, Divider } from '@mui/material';

import { Post } from '~/interface';

import { CommentList } from '../Comments';
import { PostHeader, PostBody, PostFooter } from './components';

type PostItemProps = {
  post: Post;
  isOpenComment?: boolean;
};

export const PostItem: FC<PostItemProps> = memo(({ post, isOpenComment = false }) => {
  const [openComment, setOpenComment] = useState(isOpenComment);

  const toggleComment = () => setOpenComment(!openComment);

  return (
    <Box sx={styles.container}>
      {/* User info */}
      <Box px={2} sx={{ width: '100%' }}>
        <PostHeader post={post} />

        {/* Post Content */}
        <PostBody post={post} />

        {/* post footer */}
        <PostFooter
          postedBy={post.postedBy.id}
          postId={post.id}
          likes={post.likes}
          comments={post.comments}
          retweetUsers={post.retweetUsers}
          toggleComment={toggleComment}
        />

        {/* Comment */}
        {openComment && (
          <Box>
            <Divider sx={{ bgcolor: '#38444d', my: 2 }} />
            <CommentList authorPost={post.postedBy.id} postId={post.id} />
          </Box>
        )}
      </Box>
    </Box>
  );
});

const styles = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    maxWidth: '100%',
    borderBottom: '1px solid #38444d',
    px: 2,
    pt: 3,
    pb: 2,
  },
};
