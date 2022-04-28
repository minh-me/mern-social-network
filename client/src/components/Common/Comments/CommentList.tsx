import { Box } from '@mui/material';
import { CommentItem } from './CommentItem';

type Props = {};

export const CommentList = (props: Props) => {
  return (
    <>
      <Box>
        <CommentItem />
        <CommentItem />
      </Box>
      <CommentItem />
    </>
  );
};
