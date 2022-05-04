import { Typography } from '@mui/material';

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
    >
      {text}
    </Typography>
  );
};
