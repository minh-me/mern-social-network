import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';

import { PostActionButton } from '../PostActionButton';

type Props = {
  toggleComment: () => void;
  comments: string[] | [];
};

export const CommentIconButton = ({ comments, toggleComment }: Props) => {
  return (
    <PostActionButton
      sx={styles.Button}
      onClick={toggleComment}
      numbs={comments.length || null}
      startIcon={<ChatBubbleOutlineRoundedIcon />}
    />
  );
};

const styles = {
  Button: {
    mx: 1,
    px: 1,
    color: '#b0b3b8',
    '&:hover': {
      color: '#1fa2f1',
      backgroundColor: 'rgba(153, 158, 163, 0.2)',
    },
  },
};
