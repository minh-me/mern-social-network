import { Box } from '@mui/material';
import { Title } from 'components/App';
import { MessageHeader } from './components/MessageHeader';
import { MessageItem } from './components/MessageItem';
import { MessageFooter } from './components/MessageFooter';
import { useEffect, useRef } from 'react';
import { styleScroll } from 'utils';
import { useParams } from 'react-router-dom';

type Props = {};

export const MessagePage = (props: Props) => {
  const { chatId } = useParams();
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    el?.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Title */}
        <Box sx={{ borderBottom: '1px solid #38444d' }}>
          <Title title="Message" />
        </Box>

        {/* Message Header */}
        <MessageHeader chatId={chatId || ''} />

        {/* Message Body */}
        <Box px={2} pt={4} sx={{ flex: 1, height: '100%', overflowY: 'auto', ...styleScroll }}>
          <MessageItem isOwner={false} />
          <MessageItem isOwner={true} />
          <MessageItem isOwner={false} />
          <MessageItem isOwner={true} />
          <MessageItem isOwner={false} />
          <MessageItem isOwner={true} />

          <div id={'el'} ref={el}></div>
        </Box>

        {/* Message Footer */}
        <MessageFooter />
      </Box>
    </>
  );
};
