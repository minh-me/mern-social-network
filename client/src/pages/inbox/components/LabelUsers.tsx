import { Avatar, Chip, Typography } from '@mui/material';
import { User } from 'interface';
import { FC } from 'react';

type LabelUsersProps = {
  users: User[];
  handleDeleteUser: (start: number, deleteCount?: number | undefined) => void;
};
export const LabelUsers: FC<LabelUsersProps> = ({ users, handleDeleteUser }) => {
  const handleDelete = (index: number) => {
    console.log({ index });
    handleDeleteUser(index, 1);
  };
  return (
    <Typography component="span">
      {users.map((user, index) => (
        // <Typography
        //   sx={{
        //     borderRadius: 1,
        //     p: '4px',
        //     background: 'rgba(249, 24, 128, 0.6)',
        //     mr: 1,
        //   }}
        //   fontSize={12}
        //   key={user.id}
        //   component="span"
        // >
        //   {user.name}
        // </Typography>
        <Chip
          key={user.id}
          sx={{
            borderRadius: 1,
            p: '4px',
            background: 'rgba(249, 24, 128, 0.6)',
            mr: 1,
            color: 'white',
          }}
          avatar={<Avatar alt={user.name} src={user.profilePic.url} />}
          label={user.name}
          variant="filled"
          size="small"
          onDelete={() => handleDelete(index)}
        />
      ))}
    </Typography>
  );
};
