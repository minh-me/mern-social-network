import { Box } from '@mui/material';
import { useState } from 'react';
import { useChats } from 'RQhooks/chat.rq';
import { UserListSkeleton } from 'components/Common/Variants';
import { ChatItem } from './ChatItem';
import { LoadMoreButton } from 'components/App';

export const ChatList = () => {
  const [limit, setLimit] = useState(8);
  const { data, isFetching, isLoading } = useChats({ limit });

  if (isLoading || !data) return <UserListSkeleton />;
  const { chats, info } = data;

  return (
    <Box>
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}

      <LoadMoreButton
        isFetching={isFetching}
        totalResults={info.totalResults}
        limit={limit}
        onChangeLimit={(limit) => setLimit(limit)}
      />
    </Box>
  );
};
