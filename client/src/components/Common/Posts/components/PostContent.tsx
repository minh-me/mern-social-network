import { FC } from 'react';
import { Typography, Box } from '@mui/material';
import { ImageWithModal } from 'components/Common/Images/ImageWithModal';

type PostTextProps = {
  text: string;
  imageUrl?: string;
};

export const PostContent: FC<PostTextProps> = ({ text, imageUrl }) => {
  return (
    <>
      <Box py={1}>
        <Typography sx={{ whiteSpace: 'pre-line' }} fontSize={16} color="#e1e1e1" component="span">
          {text}
        </Typography>
      </Box>
      {imageUrl && <ImageWithModal alt="Not found image" imageUrl={imageUrl} />}
    </>
  );
};
