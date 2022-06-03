import { Link } from 'react-router-dom';
import { Twemoji } from 'react-emoji-render';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { useAuthContext } from '~/hooks/useAppContext';
import { Chat, User } from '~/interface';

import { GroupAvatar } from './GroupAvatar';
import { UserAvatar } from './UserAvatar';

dayjs.extend(relativeTime);

type Props = {
  chat: Chat;
};

export const ChatItem = ({ chat }: Props) => {
  const { auth } = useAuthContext();

  const { latestMessage } = chat;

  let LatestMessage = () => (
    <>
      <Typography fontWeight={500} fontSize={12} component="span">
        {chat.admin.name}
      </Typography>
      : <Twemoji text="đã tạo nhóm." />
    </>
  );

  // Check lastest message is text or image
  if (latestMessage) {
    LatestMessage = () => (
      <>
        <Typography fontWeight={500} fontSize={12} component="span">
          {latestMessage.sender.name}
        </Typography>
        : <Twemoji text={latestMessage?.text ? latestMessage?.text : `đã gửi một ảnh.`} />
      </>
    );
  }

  let MessageAvatar = () => <GroupAvatar users={chat.users} />;
  let chatName = chat.chatName;

  // Check chat is not group
  if (!chat.isGroupChat) {
    const user = chat.users.find((user: User) => user.id !== auth?.id) as User;

    chatName = user.name;
    MessageAvatar = () => <UserAvatar user={user} />;
  }

  if (chatName && chatName.length >= 30) chatName = chatName?.slice(0, 27) + '...';

  return (
    <Box py={1} px={2} component={Link} to={`/messages/${chat.id}`} sx={styles.container}>
      <MessageAvatar />
      <Box px={2}>
        <Typography
          color={latestMessage?.readBy.includes(auth?.id as string) ? '#d51a71' : '#ff0076'}
          fontWeight={400}
          fontSize={15}
          component="p"
        >
          {chatName}
        </Typography>
        <Typography
          fontSize={12}
          color={latestMessage?.readBy.includes(auth?.id as string) ? '#8f8e8e' : '#d9d9d9'}
          component="p"
        >
          <LatestMessage />
        </Typography>
        <Typography
          fontSize={10}
          color={latestMessage?.readBy.includes(auth?.id as string) ? '#686868' : '#d9d9d9'}
          component="p"
        >
          {dayjs(chat.updatedAt).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: '0.3s ease-out',
    borderBottom: '1px solid #38444d',
    textDecoration: 'none',
    '&:hover': {
      bgcolor: '#192734',
    },
  },
};
