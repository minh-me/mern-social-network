import { Box } from '@mui/material';
import { Title } from 'components/App';
import { MessageHeader } from './MessageHeader';
import { MessageItem } from './MessageItem';
import { MessageFooter } from './MessageFooter';
import { blueGrey } from '@mui/material/colors';
import { useEffect, useRef } from 'react';
import { styleScroll } from 'utils';

type Props = {};

export const MessagePage = (props: Props) => {
  console.log('re-render');

  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    el?.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [el?.current]);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Title */}
        <Box sx={{ borderBottom: '1px solid #38444d' }}>
          <Title title="Message" />
        </Box>

        {/* Message Header */}
        <MessageHeader />

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
