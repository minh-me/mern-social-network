import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { UserListSkeleton } from 'components/Common/Variants';
import { MessageItem } from './MessageItem';
import { LoadMoreButton } from 'components/App';
import { useMessages } from 'RQhooks/message.rq';
import { useAppContext } from 'hooks/useAppContext';

export const MessageList = ({ chatId = '' }) => {
  const { state } = useAppContext();
  const [limit, setLimit] = useState(8);
  const { data, isFetching, isLoading } = useMessages({ chatId, limit });
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    el?.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, []);

  if (isLoading || !data) return <UserListSkeleton />;
  const { messages, info } = data;
  const { auth } = state;

  return (
    <Box
      id={'el'}
      ref={el}
      sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column-reverse' }}
    >
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
