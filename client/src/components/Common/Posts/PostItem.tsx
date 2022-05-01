import { FC, memo, useRef, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { PostHeader, PostContent, PostFooter } from './components';
import { Post } from 'interface';
import { CommentList } from '../Comments';

type PostItemProps = {
  post: Post;
};

export const PostItem: FC<PostItemProps> = memo(({ post }) => {
  const [openComment, setOpenComment] = useState(false);
  const toggleComment = () => setOpenComment(!openComment);
  const countRef = useRef(0);
  return (
    <Box sx={styles.container}>
      {/* User info */}
      <Box px={2} sx={{ width: '100%' }}>
        <PostHeader user={post.postedBy} postCreated={post.createdAt} />
        {countRef.current++}

        {/* Post Content */}
        <PostContent text={post.text} imageUrl={post.image?.url} />

        {/* post footer */}

        <PostFooter
          postId={post.id}
          likes={post?.likes || []}
          comments={post?.comments || []}
          shares={post?.retweetUsers || []}
          toggleComment={toggleComment}
        />
        {/* Comment */}
        {openComment && (
          <Box>
            <Divider sx={{ bgcolor: '#38444d', my: 2 }} />
            <CommentList postId={post.id} />
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
