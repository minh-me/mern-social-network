import { Avatar } from '@mui/material';

type Props = {};

export const CommentAvatar = (props: Props) => {
  return (
    <Avatar
      sx={{ border: '1px solid white', height: 26, width: 26, mr: '4px', mt: '4px' }}
      alt="Remy Sharp"
      src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png"
    />
  );
};
