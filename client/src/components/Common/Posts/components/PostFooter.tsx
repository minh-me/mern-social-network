import { FC } from 'react';
import { Box } from '@mui/material';
import {
  LikeIconButton,
  CommentIconButton,
  ShareIconButton,
} from 'components/Common/Buttons/Posts';

type Props = {
  comments: string[];
  retweetUsers: string[];
  likes: string[];
  postId: string;
  toggleComment: () => void;
};

export const PostFooter: FC<Props> = ({ comments, retweetUsers, likes, postId, toggleComment }) => {
  return (
    <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      {/* favorite */}
      <LikeIconButton likes={likes} postId={postId} />

      {/* comments */}
      <CommentIconButton toggleComment={toggleComment} comments={comments} />

      {/* share */}
      <ShareIconButton postId={postId} shares={retweetUsers} />
    </Box>
  );
};
