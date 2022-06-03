import { Box } from '@mui/material';
import { CommentText } from './CommentText';
import { AuthorComment } from './AuthorComment';

import { User } from '~/interface';

type Props = {
  replyTo?: User;
  text?: string;
  image?: string;
};

export const ContentComment = ({ replyTo, text, image }: Props) => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {replyTo && <AuthorComment author={replyTo} />}
        {text && <CommentText text={text} />}
      </Box>
      <Box mt={1} sx={styles.imageContainer}>
        {image && <img src={image} alt={image} />}
      </Box>
    </>
  );
};

const styles = {
  imageContainer: {
    img: {
      maxWidth: 400,
      borderRadius: '2px',
      overflow: 'hidden',
    },
  },
};
