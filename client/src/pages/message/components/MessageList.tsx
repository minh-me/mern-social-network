import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { UserListSkeleton } from 'components/Common/Variants';
import { MessageItem } from './MessageItem';
import { LoadMoreButton } from 'components/App';
import { useMessages } from 'RQhooks/message.rq';
import { useAuthContext } from 'hooks/useAppContext';

import { socketClient } from 'hooks/socket';
import { EVENTS } from 'contants/events';

export const MessageList = ({ chatId = '' }) => {
  const { auth } = useAuthContext();
  const [limit, setLimit] = useState(8);
  const el = useRef<HTMLDivElement>(null);
  const { data, isFetching, isLoading, refetch } = useMessages({ chatId, limit });

  useEffect(() => {
    el?.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  });

  useEffect(() => {
    socketClient.on(EVENTS.messageReceived, () => refetch());
  }, [refetch]);

  if (isLoading || !data) return <UserListSkeleton />;

  const { messages, info } = data;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column-reverse' }}>
      <Box id={'el'} ref={el} sx={{ opacity: 0 }} />
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
