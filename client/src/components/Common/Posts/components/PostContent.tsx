import { FC } from 'react';
import { Typography, Box } from '@mui/material';
import { PostImage } from './PostImage';

type PostTextProps = {
  text: string;
  imageUrl?: string;
};

export const PostContent: FC<PostTextProps> = ({ text, imageUrl }) => {
  return (
    <>
      <Box py={1}>
        <Typography fontSize={16} color="#e1e1e1" component="span">
          {text}
        </Typography>
      </Box>
      {imageUrl && <PostImage alt="Not found image" imageUrl={imageUrl} />}
    </>
  );
};
