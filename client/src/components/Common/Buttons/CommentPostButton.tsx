import { PostActionButton } from './PostActionButton';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { CommentBasic } from 'interface';
import { useAppContext } from 'hooks/useAppContext';

type Props = {
  toggleComment: () => void;
  comments: CommentBasic[] | [];
};

export const CommentPostButton = ({ comments, toggleComment }: Props) => {
  const {
    state: { auth },
  } = useAppContext();

  const isCommented = comments.some((c) => c.user == auth?.user.id);

  return (
    <PostActionButton
      sx={{
        mx: 1,
        px: 1,
        color: isCommented ? '#1fa2f1' : '#b0b3b8',
        '&:hover': {
          color: '#1fa2f1',
          bgcolor: 'rgba(153, 158, 163, 0.2)',
        },
      }}
      onClick={toggleComment}
      nums={comments.length || null}
      startIcon={<ChatBubbleOutlineRoundedIcon />}
    />
  );
};
