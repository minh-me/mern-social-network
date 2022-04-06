import { Avatar } from '@mui/material';

type Props = {};

export const UserAvatar = (props: Props) => {
  return (
    <Avatar
      alt="Remy Sharp"
      sx={{ border: '1px solid white', height: '36px', width: '36px' }}
      src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png"
    />
  );
};
