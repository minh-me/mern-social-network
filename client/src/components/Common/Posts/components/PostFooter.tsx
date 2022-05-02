import { FC, useRef } from 'react';
import { Box } from '@mui/material';
import { Comment } from 'interface';
import { LikePostButton, CommentPostButton, SharePostButton } from 'components/Common/Buttons';

type Props = {
  comments: Comment[] | [];
  shares: string[] | [];
  likes: string[] | [];
  postId: string;
  toggleComment: () => void;
};

export const PostFooter: FC<Props> = ({ comments, shares, likes, postId, toggleComment }) => {
  return (
    <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      {/* favorite */}
      <LikePostButton likes={likes} postId={postId} />

      {/* comments */}
      <CommentPostButton toggleComment={toggleComment} comments={comments} />

      {/* share */}
      <SharePostButton shares={shares} />
    </Box>
  );
};
