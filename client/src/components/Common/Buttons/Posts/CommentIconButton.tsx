import { PostActionButton } from '../PostActionButton';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';

type Props = {
  toggleComment: () => void;
  comments: string[] | [];
};

export const CommentIconButton = ({ comments, toggleComment }: Props) => {
  return (
    <PostActionButton
      sx={{
        mx: 1,
        px: 1,
        color: '#b0b3b8',
        '&:hover': {
          color: '#1fa2f1',
          bgcolor: 'rgba(153, 158, 163, 0.2)',
        },
      }}
      onClick={toggleComment}
      numbs={comments.length || null}
      startIcon={<ChatBubbleOutlineRoundedIcon />}
    />
  );
};

// isCommented ? '#1fa2f1' :'#b0b3b8'
