import { Typography } from '@mui/material';

type Props = {
  text: string;
};

export const CommentText = ({ text }: Props) => {
  return (
    <Typography fontSize={12} color="#e4e6ed">
      {text}
    </Typography>
  );
};
