import { Box } from '@mui/material';
import { CommentText } from './CommentText';
import { AuthorComment } from './AuthorComment';

import { User } from '~/interface';
import { useEffect, useRef } from 'react';

type Props = {
  replyTo?: User;
  text?: string;
  image?: string;
};

export const ContentComment = ({ replyTo, text, image }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) img?.setAttribute('src', img?.getAttribute('alt') || '');
    });

    if (img) observer.observe(img);

    return () => {
      if (img) observer.unobserve(img);
    };
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {replyTo && <AuthorComment isReplyUser={true} author={replyTo} />}
        {text && <CommentText text={text} />}
      </Box>
      <Box mt={1} sx={styles.imageContainer}>
        {image && <img ref={imgRef} alt={image} />}
      </Box>
    </>
  );
};

const styles = {
  imageContainer: {
    img: {
      maxWidth: 340,
      borderRadius: '2px',
      overflow: 'hidden',
      background: 'white',
    },
  },
};
