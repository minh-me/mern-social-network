import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { UserListSkeleton } from '~/components/Common/Variants';
import { LoadMoreButton } from '~/components/Common/Buttons';
import { useMessages } from '~/RQhooks/message.rq';
import { useAuthContext } from '~/hooks/useAppContext';
import { socketClient, EVENTS } from '~/socketIO';

import { MessageItem } from './MessageItem';

export const MessageList = ({ chatId = '' }) => {
  const [limit, setLimit] = useState(8);
  const el = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const { auth } = useAuthContext();

  const { data, isFetching, isLoading } = useMessages({ chatId, limit }, { cacheTime: Infinity });

  useEffect(() => {
    el?.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  });

  // Typing
  useEffect(() => {
    socketClient.on(EVENTS.typing, () => setIsTyping(true));
    socketClient.on(EVENTS.stopTyping, () => setIsTyping(false));
  }, []);

  if (isLoading || !data) return <UserListSkeleton />;

  const { messages, info } = data;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column-reverse' }}>
      <Box id={'el'} ref={el} sx={{ opacity: 0 }} />

      {isTyping && (
        <Box mx={9} my={2}>
          <div className="snippet" data-title=".dot-falling">
            <div className="stage">
              <div className="dot-falling"></div>
            </div>
          </div>
        </Box>
      )}

      {messages.map((message) => (
        <MessageItem isOwner={message.sender.id === auth?.id} key={message.id} message={message} />
      ))}

      <LoadMoreButton
        isFetching={isFetching}
        totalResults={info.totalResults}
        limit={limit}
        onChangeLimit={(limit) => setLimit(limit)}
      />

      {info.totalResults === 0 && (
        <Typography textAlign="center" fontSize={16}>
          Nothing to show.
        </Typography>
      )}
    </Box>
  );
};
