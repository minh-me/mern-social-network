import { Box } from '@mui/material';
import { Title } from 'components/App';
import { MessageHeader } from './components/MessageHeader';
import { MessageFooter } from './components/MessageFooter';
import { styleScroll } from 'utils';
import { useParams } from 'react-router-dom';
import { MessageList } from './components/MessageList';

type Props = {};

export const MessagePage = (props: Props) => {
  const { chatId } = useParams();
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
