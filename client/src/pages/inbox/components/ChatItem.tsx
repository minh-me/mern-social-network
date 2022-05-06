import { Box, Typography } from '@mui/material';
import { GroupAvatar } from './GroupAvatar';
import { UserAvatar } from './UserAvatar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Chat } from 'interface';
dayjs.extend(relativeTime);

type Props = {
  chat: Chat;
};

export const ChatItem = ({ chat }: Props) => {
  return (
    <Box
      py={1}
      px={2}
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: '0.3s ease-out',
        borderBottom: '1px solid #38444d',
        '&:hover': {
          bgcolor: '#192734',
        },
      }}
    >
      {chat.isGroupChat ? <GroupAvatar /> : <UserAvatar />}
      <Box px={2}>
        <Typography
          color={true ? '#ff0076' : '#d51a71'}
          fontWeight={400}
          fontSize={15}
          component="p"
        >
          {chat.chatName}
        </Typography>
        <Typography fontSize={12} color={true ? 'white' : '#8f8e8e'} component="p">
          Bạn: đã gửi một ảnh.
        </Typography>
        <Typography fontSize={10} color={true ? 'white' : '#686868'} component="p">
          {dayjs(chat.createdAt).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};
