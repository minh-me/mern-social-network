import { ButtonPost } from './ButtonPost';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';

export const CommentButton = ({ isActive = false }) => {
  const likeHandler = () => {
    console.log('Liked');
  };

  return (
    <ButtonPost
      sx={{
        mx: 1,
        px: 1,
        color: isActive ? '#1fa2f1' : '#b0b3b8',
        '&:hover': {
          color: '#1fa2f1',
          bgcolor: 'rgba(153, 158, 163, 0.2)',
        },
      }}
      onClick={likeHandler}
      nums={12}
      startIcon={<ChatBubbleOutlineRoundedIcon />}
    />
  );
};
