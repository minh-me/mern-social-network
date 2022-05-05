import { LoadingButton } from '@mui/lab';
import { pink } from '@mui/material/colors';
import { useFollow } from 'RQhooks';
import { User } from 'interface';
import { useAppContext } from 'hooks/useAppContext';

type Props = {
  user: User;
};

export const FollowButton = ({ user }: Props) => {
  const { state } = useAppContext();
  const { auth } = state;
  const isFollowing = user?.followers?.includes(auth?.id as string);
  const { mutate, isLoading } = useFollow();
  const handleClick = () => {
    if (user.id) {
      mutate(user.id);
    }
  };
  return (
    <LoadingButton
      sx={isFollowing ? styles.buttonFollowing : styles.buttonFollow}
      variant={isFollowing ? 'contained' : 'outlined'}
      onClick={handleClick}
      loading={isLoading}
    >
      {isFollowing ? 'Following' : 'Follow'}
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
