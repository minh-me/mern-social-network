import { PostActionButton } from './PostActionButton';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { pink } from '@mui/material/colors';

export const LikePostButton = ({ isActive = false, likes = [''] }) => {
  const likeHandler = () => {
    console.log('Liked');
  };

  return (
    <PostActionButton
      sx={{
        mx: 1,
        px: 1,
        color: isActive ? pink[400] : '#b0b3b8',
        '&:hover': {
          color: pink[400],
          bgcolor: 'rgba(153, 158, 163, 0.2)',
        },
      }}
      onClick={likeHandler}
      nums={likes.length || null}
      startIcon={<FavoriteBorderRoundedIcon />}
    />
  );
};
