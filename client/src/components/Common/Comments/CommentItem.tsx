import { Box } from '@mui/material';
import { ButtonAction } from './components/ButtonAction';
import { ReplyCommentButton } from './components/ReplyCommentButton';
import { LikeCommentButton } from './components/LikeCommentButton';
import { CommentAvatar } from './components/CommentAvatar';
import { CommentName } from './components/CommentName';
import { CommentText } from './components/CommentText';

export const CommentItem = () => {
  return (
    <Box my="12px">
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <CommentAvatar />
        <Box>
          <Box sx={{ bgcolor: '#3a3b3c', p: '4px 8px', borderRadius: 2 }}>
            <CommentName />
            <CommentText />
          </Box>

          <Box sx={{ display: 'flex', mt: '4px' }}>
            <LikeCommentButton />
            <ReplyCommentButton />
            <ButtonAction>15 giờ</ButtonAction>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
