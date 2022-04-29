import { FC } from 'react';
import { Box } from '@mui/material';
import { Post, User } from 'interface';
import { LikePostButton, CommentPostButton, SharePostButton } from 'components/Common/Buttons';

type Props = {
  comments?: string[];
  shares?: string[];
  likes?: string[];
  postId?: string;
};

export const PostFooter: FC<Props> = ({ comments, shares, likes, postId }) => {
  return (
    <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      {/* favorite */}
      <LikePostButton likes={likes} postId={postId} />

      {/* comments */}
      <CommentPostButton comments={comments} />

      {/* share */}
      <SharePostButton shares={shares} />
    </Box>
  );
};
