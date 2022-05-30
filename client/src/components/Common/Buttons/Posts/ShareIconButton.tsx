import { PostActionButton } from '../PostActionButton';
import ShareIcon from '@mui/icons-material/Share';
import { pink } from '@mui/material/colors';

export const ShareIconButton = ({ isActive = false, shares = [''] }) => {
  const retweetHandler = () => {
    console.log('Liked');
  };

  return (
    <PostActionButton
      sx={{
        mx: 1,
        px: 1,
        color: isActive ? pink[400] : '#b0b3b8',
        '&:hover': {
          color: pink[400],
          bgcolor: 'rgba(153, 158, 163, 0.2)',
        },
      }}
      onClick={retweetHandler}
      nums={shares.length || null}
      startIcon={<ShareIcon />}
    />
  );
};
