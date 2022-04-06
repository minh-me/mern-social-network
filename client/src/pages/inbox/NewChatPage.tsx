import React, { FC, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Title } from 'components/App';
import { UserItem } from 'components/Common';
import { userFroms } from 'pages/search';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { User } from 'interface';
import { LabelUsers } from './LabelUsers';
import { pink } from '@mui/material/colors';

interface InputProps {
  text: string;
}

type Props = {};

export const NewChatPage: FC<Props> = (props) => {
  const [selectedUsers, setSelectedUsers] = useState<{ name: string; id: string }[]>([]);
  const { control, handleSubmit, reset, getValues } = useForm<InputProps>({
    defaultValues: { text: '' },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    console.log({ data });
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (getValues('text').length === 0 && e.key === 'Backspace' && selectedUsers.length > 0)
      return setSelectedUsers(selectedUsers.slice(0, -1));
  };

  const handleAddSelectedUsers = (user: { id: string; name: string }) => {
    if (selectedUsers.some((sUser) => sUser.id === user.id)) return;
    setSelectedUsers([...selectedUsers, { id: user.id, name: user.name }]);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="New Chat" />
      </Box>

      <Box
        px={3}
        sx={{
          maxWidth: '100%',
          borderBottom: '1px solid #38444d',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <form id="createPostForm" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="text"
            render={({ field }) => (
              <Box py={1}>
                <Typography sx={{ pr: 1 }} component="span">
                  To:{' '}
                </Typography>
                {selectedUsers.length > 0 && <LabelUsers users={selectedUsers} />}
                <input
                  {...field}
                  placeholder="Type the name of person"
                  onKeyDown={handleKeyDown}
                  style={{
                    color: 'white',
                    fontSize: 16,
                    outline: 'none',
                    border: 0,
                    backgroundColor: 'transparent',
                    flex: 1,
                    minWidth: '350px',
                    padding: '8px 0px',
                  }}
                />
              </Box>
            )}
          />
        </form>
      </Box>

      {/* Users List */}
      {userFroms.map((user: User) => (
        <Box
          onClick={() => handleAddSelectedUsers({ id: user.id, name: user.name })}
          key={user.id}
          py={2}
          px={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #38444d',
          }}
        >
          <UserItem
            name={user.name}
            username={user.username}
            profilePic={user.profilePic}
            numFollowers={3}
            isFollowing={false}
          />
        </Box>
      ))}

      {/* Button Create */}
      <Box my={2} sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          disabled={true}
          sx={{
            color: '#fff',
            background: pink[500],
            textTransform: 'capitalize',
            fontWeight: '400',
            borderRadius: 25,
            '&:hover': {
              background: pink[400],
            },
            '&:disabled': {
              bgcolor: '#b5496b',
              color: 'white',
            },
          }}
        >
          Create Chat
        </Button>
      </Box>
    </Box>
  );
};
