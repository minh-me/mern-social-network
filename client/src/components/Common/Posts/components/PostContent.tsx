import { FC } from 'react';
import { Typography, Box } from '@mui/material';
import { ImageWithModal } from 'components/Common/Images/ImageWithModal';
import ShowMoreText from 'react-show-more-text';

type PostTextProps = {
  text: string;
  imageUrl?: string;
};

export const PostContent: FC<PostTextProps> = ({ text, imageUrl }) => {
  return (
    <>
      <Box py={1}>
        <ShowMoreText className="textBreak" more="Show more" less="...Show less" expanded={false}>
          <Typography fontSize={16} color="#e1e1e1">
            {text}
          </Typography>
        </ShowMoreText>
      </Box>
      {imageUrl && <ImageWithModal alt="Not found image" imageUrl={imageUrl} />}
    </>
  );
};
