import { FC } from 'react';
import { Box } from '@mui/material';
import { Post, User } from 'interface';
import { LikeButton, CommentButton, ShareButton } from 'components/Common/Buttons';

type Props = {
  comments?: User[];
  shares?: Post[];
  likes?: User[];
};

export const PostFooter: FC<Props> = ({ comments, shares, likes }) => {
  return (
    <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      {/* favorite */}
      <LikeButton />

      {/* comments */}
      <CommentButton />

      {/* share */}
      <ShareButton />
    </Box>
  );
};
