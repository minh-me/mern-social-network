import { FC } from 'react';
import { Box } from '@mui/material';
import { Post, User } from 'interface';
import { LikePostButton, CommentPostButton, SharePostButton } from 'components/Common/Buttons';

type Props = {
  comments?: string[];
  shares?: string[];
  likes?: string[];
};

export const PostFooter: FC<Props> = ({ comments, shares, likes }) => {
  return (
    <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      {/* favorite */}
      <LikePostButton likes={likes} />

      {/* comments */}
      <CommentPostButton comments={comments} />

      {/* share */}
      <SharePostButton shares={shares} />
    </Box>
  );
};
