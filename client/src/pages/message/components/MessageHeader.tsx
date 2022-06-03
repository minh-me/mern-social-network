import { Box, IconButton } from '@mui/material';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';

import { useChat } from '~/RQhooks/chat.rq';
import { useAuthContext } from '~/hooks/useAppContext';
import { MessageHeaderSkeleton } from '~/components/Common/Variants/MessageSkeleton';
import { MessageAvatar } from './MessageAvatar';
import { ChatName } from './ChatName';

type Props = {
  chatId: string | '';
};

export const MessageHeader = ({ chatId }: Props) => {
  const { auth } = useAuthContext();
  const { data: chat, isLoading } = useChat({ chatId });

  if (isLoading || !chat) return <MessageHeaderSkeleton />;

  let chatName = chat.chatName as string;

  if (!chatName) {
    chatName = chat.users.find((user) => user.id !== auth?.id)?.name as string;
  }

  return (
    <Box
      py={1}
      px={2}
      sx={{ borderBottom: '1px solid #38444d', display: 'flex', alignItems: 'center' }}
    >
      <MessageAvatar isGroupChat={chat.isGroupChat} users={chat.users} />
      <Box sx={{ flex: 1 }}>
        <ChatName chatId={chat.id} chatName={chatName} />
      </Box>

      <Box>
        <IconButton color="primary">
          <PhoneOutlinedIcon />
        </IconButton>
        <IconButton color="primary">
          <VideoCallOutlinedIcon />
        </IconButton>
        <IconButton color="primary">
          <ReportOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
