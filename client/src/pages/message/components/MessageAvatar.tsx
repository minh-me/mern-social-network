import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

import { User } from '~/interface/user.interface';
import { UserAvatar } from '~/pages/inbox/components/UserAvatar';

type Props = {
  users: User[];
  isGroupChat: boolean;
};

export const MessageAvatar = ({ users, isGroupChat }: Props) => {
  return (
    <>
      {isGroupChat ? (
        <AvatarGroup max={4} spacing="medium" sx={styles.container}>
          {users.map((user) => (
            <Avatar
              key={user.id}
              alt={user.name}
              src={user.profilePic.url}
              sx={{ width: 34, height: 34 }}
            />
          ))}
        </AvatarGroup>
      ) : (
        <UserAvatar user={users[0]} />
      )}
    </>
  );
};

const styles = {
  container: {
    justifyContent: 'flex-end',
    'div:first-of-type': {
      border: 0,
      width: 38,
      height: 38,
      bgcolor: 'rgb(55 73 80)',
      color: 'white',
      fontSize: 14,
    },
  },
};
