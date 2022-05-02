import { CommentActionButton } from './CommentActionButton';
import { Box } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';

type Props = {};

export const LikeCommentButton = (props: Props) => {
  const isLiked = true;
  return (
    <CommentActionButton>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: isLiked ? '#2284c2' : 'inherit',
          svg: {
            fontSize: 12,
            mr: '4px',
          },
        }}
      >
        {isLiked ? <ThumbUpRoundedIcon /> : <ThumbUpOutlinedIcon />}
        10
      </Box>
    </CommentActionButton>
  );
};
