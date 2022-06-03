import { Avatar } from '@mui/material';
import { User } from '~/interface';

type Props = {
  user: User;
};

export const UserAvatar = ({ user }: Props) => {
  return (
    <Avatar
      alt={user.username}
      sx={{ border: '1px solid white', height: '36px', width: '36px' }}
      src={user.profilePic.url}
    />
  );
};
