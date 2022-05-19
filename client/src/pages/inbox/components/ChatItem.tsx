import { Box, Typography } from '@mui/material';
import { GroupAvatar } from './GroupAvatar';
import { UserAvatar } from './UserAvatar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Chat, User } from 'interface';
import { Link } from 'react-router-dom';
import { useAppContext } from 'hooks/useAppContext';
dayjs.extend(relativeTime);

type Props = {
  chat: Chat;
};

export const ChatItem = ({ chat }: Props) => {
  const { state } = useAppContext();
  const { auth } = state;
  const { lastestMessage } = chat;

  let msg = `${chat.admin.name}: đã tạo nhóm.`;

  // Check lastest message is text or image
  if (lastestMessage) {
    msg = lastestMessage?.text
      ? `${lastestMessage.sender.name}: ${lastestMessage?.text}`
      : `${lastestMessage.sender.name}: đã gửi một ảnh.`;
  }

  let MessageAvatar = () => <GroupAvatar users={chat.users} />;
  let chatName = chat.chatName;

  // Check chat is not group
  if (!chat.isGroupChat) {
    const user = chat.users.find((user) => user.id !== auth?.id) as User;

    chatName = user.name;
    MessageAvatar = () => <UserAvatar user={user} />;
  }

  return (
    <Box py={1} px={2} component={Link} to={`/messages/${chat.id}`} sx={styles.container}>
      <MessageAvatar />
      <Box px={2}>
        <Typography
          color={true ? '#ff0076' : '#d51a71'}
          fontWeight={400}
          fontSize={15}
          component="p"
        >
          {chatName}
        </Typography>
        <Typography fontSize={12} color={true ? 'white' : '#8f8e8e'} component="p">
          {msg}
        </Typography>
        <Typography fontSize={10} color={true ? 'white' : '#686868'} component="p">
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
