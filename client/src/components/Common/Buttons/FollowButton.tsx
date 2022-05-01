import { Button } from '@mui/material';
import { pink } from '@mui/material/colors';

export const FollowButton = ({ isActive = false, userId = '' }) => {
  const handleClick = () => {
    console.log('Clicked follow');
  };
  return (
    <Button
      sx={isActive ? styles.buttonFollowing : styles.buttonFollow}
      variant={isActive ? 'contained' : 'outlined'}
      onClick={handleClick}
    >
      {isActive ? 'Following' : 'Follow'}
    </Button>
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
  },
};
