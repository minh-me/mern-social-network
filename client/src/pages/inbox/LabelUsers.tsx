import { Typography } from '@mui/material';
import { FC } from 'react';

type LabelUsersProps = {
  users: { name: string; id: string }[];
};
export const LabelUsers: FC<LabelUsersProps> = ({ users }) => {
  return (
    <Typography component="span">
      {users.map((user) => (
        <Typography
          sx={{
            borderRadius: 1,
            p: '4px',
            background: 'rgba(249, 24, 128, 0.6)',
            mr: 1,
          }}
          fontSize={12}
          key={user.id}
          component="span"
        >
          {user.name}
        </Typography>
      ))}
    </Typography>
  );
};
