import { Typography } from '@mui/material';
import { Twemoji } from 'react-emoji-render';

type Props = {
  text: string;
};

export const CommentText = ({ text }: Props) => {
  return (
    <Typography
      sx={{
        whiteSpace: 'pre-line',
        overflowWrap: 'anywhere',
      }}
      fontSize={13}
      color="#e4e6ed"
      component={Twemoji}
      text={text}
    />
  );
};
