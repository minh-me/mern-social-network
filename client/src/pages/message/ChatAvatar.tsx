import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export const ChatAvatar = () => {
  return (
    <AvatarGroup
      max={4}
      spacing="medium"
      sx={{
        justifyContent: 'flex-end',
        'div:first-of-type': {
          border: 0,
          width: 38,
          height: 38,
          bgcolor: 'rgb(55 73 80)',
          color: 'white',
          fontSize: 14,
        },
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png"
        sx={{ width: 34, height: 34 }}
      />
      <Avatar
        alt="Travis Howard"
        src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png"
        sx={{ width: 34, height: 34 }}
      />
      <Avatar
        alt="Cindy Baker"
        src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png"
        sx={{ width: 34, height: 34 }}
      />
      <Avatar
        alt="Agnes Walker"
        src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png"
        sx={{ width: 34, height: 34 }}
      />
      <Avatar
        alt="Trevor Henderson"
        src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png"
        sx={{ width: 34, height: 34 }}
      />
    </AvatarGroup>
  );
};
