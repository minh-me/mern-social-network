import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import { pink } from '@mui/material/colors';
import { useFollow } from 'RQhooks';

export const FollowButton = ({ isActive = false, userId = '' }) => {
  const { mutate, isLoading } = useFollow();
  const handleClick = () => {
    if (userId) {
      mutate(userId);
    }
    console.log('Clicked follow');
  };
  return (
    <LoadingButton
      sx={isActive ? styles.buttonFollowing : styles.buttonFollow}
      variant={isActive ? 'contained' : 'outlined'}
      onClick={handleClick}
      loading={isLoading}
    >
      {isActive ? 'Following' : 'Follow'}
    </LoadingButton>
  );
};
const styles = {
  buttonFollow: {
    color: pink[400],
    borderColor: 'rgb(173 173 173 / 80%)',
    textTransform: 'capitalize',
    borderRadius: 5,
    fontSize: 14,
    padding: '6px 15px',
    '&:hover': {
      borderColor: pink[600],
    },
    '&:disabled': {
      borderColor: pink[600],
      svg: {
        color: 'rgba(249, 24, 128, 1)',
      },
    },
  },
  buttonFollowing: {
    textTransform: 'capitalize',
    borderRadius: 5,
    fontSize: 14,
    padding: '6px 15px',
    bgcolor: pink[600],
    color: 'white',
    borderColor: 'rgb(173 173 173 / 80%)',
    '&:hover': {
      bgcolor: pink[400],
    },
    '&:disabled': {
      bgcolor: pink[600],
      svg: {
        color: 'white',
      },
    },
  },
};
