import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Lottie from 'react-lottie';
import * as animationData from 'animations/dote-typing-animation.json';

import { UserListSkeleton } from 'components/Common/Variants';
import { MessageItem } from './MessageItem';
import { LoadMoreButton } from 'components/Common/Buttons';
import { useMessages } from 'RQhooks/message.rq';
import { useAuthContext } from 'hooks/useAppContext';
import { socketClient, EVENTS } from 'socketIO';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
};

export const MessageList = ({ chatId = '' }) => {
  const { auth } = useAuthContext();
  const [limit, setLimit] = useState(8);
  const el = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const { data, isFetching, isLoading } = useMessages({ chatId, limit }, { cacheTime: Infinity });

  useEffect(() => {
    el?.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  });

  // Typing
  useEffect(() => {
    socketClient.on(EVENTS.typing, () => setIsTyping(true));
    socketClient.on(EVENTS.stopTyping, () => setIsTyping(false));
  }, [setIsTyping]);

  if (isLoading || !data) return <UserListSkeleton />;

  const { messages, info } = data;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column-reverse' }}>
      <Box id={'el'} ref={el} sx={{ opacity: 0 }} />

      {isTyping && <Lottie options={defaultOptions} style={{ margin: 0 }} width={98} />}

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
