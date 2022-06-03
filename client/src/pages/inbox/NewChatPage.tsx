import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { pink } from '@mui/material/colors';
import { Box } from '@mui/material';

import { Title } from '~/components/App';
import { User } from '~/interface';
import { useCreateChat } from '~/RQhooks/chat.rq';

import { ChatUserList } from './components/ChatUserList';
import { FormSearchUserLabel } from './components/FormSearchUserLabel';

export const NewChatPage = () => {
  const [search, setSearch] = useState('');
  const [usersSelected, setUsersSelected] = useState<User[]>([]);
  const { mutateAsync, isLoading, data } = useCreateChat();
  const navigate = useNavigate();

  const handleSubmitCreateChat = () => {
    const userIds = usersSelected.map((user) => user.id);
    const chatNames = usersSelected.map((user) => user.name);
    const chatName = chatNames.join(',');
    const isGroupChat = userIds.length > 1 ? true : false;

    toast.promise(mutateAsync({ users: userIds, chatName, isGroupChat }), {
      pending: 'Creating room chat ...',
    });
  };

  const handleAddUsersSelected = (user: User) => {
    if (usersSelected.some((userIds) => userIds.id === user.id)) return;
    setUsersSelected([...usersSelected, user]);
  };

  const handleDeleteUserSelected = (start: number, deleteCount?: number) => {
    setUsersSelected((prevUsersSeleted) => {
      const newUsers = [...prevUsersSeleted];
      newUsers.splice(start, deleteCount);
      return newUsers;
    });
  };

  useEffect(() => {
    if (data) navigate(`/messages/${data.id}`);
  }, [data, navigate]);

  return (
    <Box>
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="New Chat" />
      </Box>

      <FormSearchUserLabel
        setSearch={setSearch}
        usersSelected={usersSelected}
        handleDeleteUser={handleDeleteUserSelected}
      />

      {/* Users List */}
      {search && (
        <ChatUserList
          search={search}
          usersSelected={usersSelected}
          handleAddUsersSelected={handleAddUsersSelected}
        />
      )}

      {/* Button Create */}
      <Box my={2} sx={{ textAlign: 'center' }}>
        <LoadingButton
          loading={isLoading}
          onClick={handleSubmitCreateChat}
          variant="contained"
          disabled={usersSelected.length <= 0}
          sx={styles.buttonCreate}
        >
          Create Chat
        </LoadingButton>
      </Box>
    </Box>
  );
};

const styles = {
  createChatFormContainer: {
    maxWidth: '100%',
    borderBottom: '1px solid #38444d',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '24px',
    paddingRight: '24px',
  },
  buttonCreate: {
    color: '#fff',
    background: pink[500],
    textTransform: 'capitalize',
    fontWeight: '400',
    borderRadius: 25,
    '&:hover': {
      background: pink[400],
    },
    '&:disabled': {
      background: pink[400],
      div: { color: 'white' },
    },
  },

  input: {
    color: 'white',
    fontSize: 16,
    outline: 'none',
    border: 0,
    backgroundColor: 'transparent',
    flex: 1,
    minWidth: '350px',
    padding: '8px 0px',
  },
};
