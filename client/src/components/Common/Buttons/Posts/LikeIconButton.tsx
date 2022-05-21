import { PostActionButton } from '../PostActionButton';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { pink } from '@mui/material/colors';
import { useLikePost } from 'RQhooks';
import { useAuthContext } from 'hooks/useAppContext';

export const LikeIconButton = ({ likes = [''], postId = '' }) => {
  const { auth } = useAuthContext();
  const { mutate } = useLikePost();

  const isLiked = likes.includes(auth?.id as string);

  const likeHandler = () => mutate(postId);

  return (
    <PostActionButton
      sx={{
        mx: 1,
        px: 1,
        color: isLiked ? pink[400] : '#b0b3b8',
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
