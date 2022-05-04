import { Avatar } from '@mui/material';

export const AvatarComment = ({ avatar }: { avatar: string }) => {
  return (
    <Avatar
      sx={{ border: '1px solid white', height: 26, width: 26, mr: '4px', mt: '4px' }}
      alt="Remy Sharp"
      src={avatar}
    />
  );
};
