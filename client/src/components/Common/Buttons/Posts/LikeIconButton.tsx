import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { pink } from '@mui/material/colors';

import { useLikePost } from '~/RQhooks';
import { useAuthContext } from '~/hooks/useAppContext';
import { EVENTS, socketClient } from '~/socketIO';

import { PostActionButton } from '../PostActionButton';

export const LikeIconButton = ({ likes = [''], postId = '', postedBy = '' }) => {
  const { auth } = useAuthContext();
  const { mutateAsync } = useLikePost();

  const isLiked = likes.includes(auth?.id as string);

  const likeHandler = async () => {
    await mutateAsync(postId);

    // Socket
    if (!isLiked && postedBy !== auth?.id) {
      socketClient.emit(EVENTS.notificationReceived, postedBy);
    }
  };

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
      numbs={likes.length || null}
      startIcon={<FavoriteBorderRoundedIcon />}
    />
  );
};
