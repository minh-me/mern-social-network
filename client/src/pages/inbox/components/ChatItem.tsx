import { Box, Typography } from '@mui/material';
import { GroupAvatar } from './GroupAvatar';
import { UserAvatar } from './UserAvatar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Chat, User } from 'interface';
import { Link } from 'react-router-dom';
import { useAuthContext } from 'hooks/useAppContext';
import { Twemoji } from 'react-emoji-render';
dayjs.extend(relativeTime);

type Props = {
  chat: Chat;
};

export const ChatItem = ({ chat }: Props) => {
  const { auth } = useAuthContext();
  const { lastestMessage } = chat;

  let LastestMessage = () => (
    <>
      <Typography fontWeight={500} fontSize={12} component="span">
        {chat.admin.name}
      </Typography>
      : <Twemoji text="đã tạo nhóm." />
    </>
  );

  // Check lastest message is text or image
  if (lastestMessage) {
    LastestMessage = () => (
      <>
        <Typography fontWeight={500} fontSize={12} component="span">
          {lastestMessage.sender.name}
        </Typography>
        : <Twemoji text={lastestMessage?.text ? lastestMessage?.text : `đã gửi một ảnh.`} />
      </>
    );
  }

  let MessageAvatar = () => <GroupAvatar users={chat.users} />;
  let chatName = chat.chatName;

  // Check chat is not group
  if (!chat.isGroupChat) {
    const user = chat.users.find((user) => user.id !== auth?.id) as User;

    chatName = user.name;
    MessageAvatar = () => <UserAvatar user={user} />;
  }

  if (chatName && chatName.length >= 30) chatName = chatName?.slice(0, 27) + '...';

  return (
    <Box py={1} px={2} component={Link} to={`/messages/${chat.id}`} sx={styles.container}>
      <MessageAvatar />
      <Box px={2}>
        <Typography
          color={lastestMessage?.readBy.includes(auth?.id as string) ? '#d51a71' : '#ff0076'}
          fontWeight={400}
          fontSize={15}
          component="p"
        >
          {chatName}
        </Typography>
        <Typography
          fontSize={12}
          color={lastestMessage?.readBy.includes(auth?.id as string) ? '#8f8e8e' : '#d9d9d9'}
          component="p"
        >
          <LastestMessage />
        </Typography>
        <Typography
          fontSize={10}
          color={lastestMessage?.readBy.includes(auth?.id as string) ? '#686868' : '#d9d9d9'}
          component="p"
        >
          {dayjs(chat.createdAt).fromNow()}
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
