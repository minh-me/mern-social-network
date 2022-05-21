import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

import { Title } from 'components/App';
import { MessageHeader } from './components/MessageHeader';
import { MessageFooter } from './components/MessageFooter';
import { styleScroll } from 'utils';
import { MessageList } from './components/MessageList';
import { EVENTS } from 'contants/events';

const socket = io('http://localhost:8888');
export const MessagePage = () => {
  const { chatId } = useParams();

  // Add user to socket
  useEffect(() => {
    socket.emit(EVENTS.joinChat, chatId);
  }, [chatId]);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Title */}
        <Box sx={{ borderBottom: '1px solid #38444d' }}>
          <Title title="Message" />
        </Box>

        {/* Message Header */}
        <MessageHeader chatId={chatId as string} />

        {/* Message Body */}
        <Box px={2} pt={4} sx={{ flex: 1, height: '100%', overflowY: 'auto', ...styleScroll }}>
          <MessageList chatId={chatId} />
        </Box>

        {/* Message Footer */}
        <MessageFooter chatId={chatId as string} />
      </Box>
    </>
  );
};
