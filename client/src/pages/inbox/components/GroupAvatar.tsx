import { FC } from 'react';
import { Box, Avatar } from '@mui/material';
import { User } from '~/interface';

type Props = {
  users: User[];
};

export const GroupAvatar: FC<Props> = ({ users }) => {
  return (
    <Box
      sx={{
        height: 40,
        width: 40,
        position: 'relative',
        p: '2px',
        display: 'flex',
        alignItems: 'center',
        'div:first-of-type': {
          top: 0,
          right: -4,
        },
      }}
    >
      <Avatar
        alt="Remy Sharp"
        sx={{
          height: '65%',
          width: '65%',
          position: 'absolute',
          border: '1px solid white',
          borderRadius: '50%',
          bottom: '0',
        }}
        src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png"
      />
      <Avatar
        alt="Remy Sharp"
        sx={{
          height: '65%',
          width: '65%',
          position: 'absolute',
          border: '1px solid white',
          borderRadius: '50%',
          bottom: '0',
        }}
        src="https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png"
      />
    </Box>
  );
};
