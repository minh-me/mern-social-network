import { FC } from 'react';
import { Box } from '@mui/material';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShareIcon from '@mui/icons-material/Share';
import { pink } from '@mui/material/colors';
import { ButtonPost } from 'components/Common/Buttons';
import { Post, User } from 'interface';

type Props = {
  comments?: User[];
  shares?: Post[];
  likes?: User[];
};

export const PostFooter: FC<Props> = ({ comments, shares, likes }) => {
  return (
    <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      {/* favorite */}
      <ButtonPost
        sx={{ color: pink[400] }}
        nums={312323423}
        startIcon={<FavoriteBorderRoundedIcon />}
      />

      {/* comments */}
      <ButtonPost
        sx={{ color: '#1fa2f1' }}
        nums={312323423}
        startIcon={<ChatBubbleOutlineRoundedIcon />}
      />

      {/* share */}
      <ButtonPost sx={{ color: '#ffffff' }} nums={312323423} startIcon={<ShareIcon />} />
    </Box>
  );
};
