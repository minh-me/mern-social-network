import { ActionButton } from './ActionButton';
import { Box } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';

import { useLikeComment } from '~/RQhooks';

type Props = {
  likes: string[] | [];
  isLiked: boolean;
  commentId: string;
};

export const LikeCommentButton = ({ commentId, likes, isLiked }: Props) => {
  const { mutate } = useLikeComment();

  const handleLikeComment = () => {
    mutate(commentId);
  };

  return (
    <ActionButton
      onClick={handleLikeComment}
      sx={{ '&:hover': { textDecoration: 'none', color: isLiked ? 'white' : '#2284c2' } }}
    >
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
        {likes.length > 0 ? (
          <>
            {isLiked ? <ThumbUpRoundedIcon /> : <ThumbUpOutlinedIcon />}
            {likes.length}
          </>
        ) : (
          'Thích'
        )}
      </Box>
    </ActionButton>
  );
};
