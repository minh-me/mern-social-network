import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Twemoji } from 'react-emoji-render';
import { useQueryClient } from 'react-query';

import { useCreateMessage } from '~/RQhooks/message.rq';
import { MDialogInput } from '~/components/Common/Modal';
import { useUpdateChat } from '~/RQhooks/chat.rq';
import { Chat } from '~/interface';
import { socketClient, EVENTS } from '~/socketIO';

type Props = {
  chatId: string;
  chatName: string;
};

export const ChatName = ({ chatId, chatName }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync } = useUpdateChat();
  const { mutateAsync: newMessage } = useCreateMessage();

  const handleSubmit = async (value: string) => {
    await mutateAsync({ filter: { chatId }, body: { chatName: value } });

    socketClient.emit(EVENTS.renameChat, { chatId: chatId, newChatName: value });

    setOpenModal(false);
  };

  // Update rename chat
  useEffect(() => {
    socketClient.on(EVENTS.renameChat, async (data: { chatId: string; newChatName: string }) => {
      const chatIdKey = queryClient.getQueryData('chatIdKey') as string;
      const chatsKey = queryClient.getQueryData('chatsKey');
      // Update query cache current chat
      queryClient.setQueryData(chatIdKey, (oldChat: any) => {
        oldChat.chatName = data.newChatName;
        return oldChat;
      });

      const formData = new FormData();
      formData.append('chat', data.chatId);
      formData.append('text', `Tên chat "${chatName}" đã đổi thành "${data.newChatName}" `);
      formData.append('isRename', 'true');

      await newMessage(formData);

      // Update chat list
      if (!chatsKey) return;
      queryClient.setQueryData(chatsKey as string, (oldChats: any) => {
        // Get updated chat index
        const updatedChatIndex = oldChats.chats.findIndex((chat: Chat) => chat.id === data.chatId);

        // Update to new
        oldChats.chats[updatedChatIndex].chatName = data.newChatName;

        // Success
        return oldChats;
      });
    });
  }, [queryClient, newMessage, chatName]);

  return (
    <>
      <Typography
        color="#f91880"
        fontSize={16}
        component="p"
        onClick={() => setOpenModal(true)}
        sx={{
          ml: 1,
          px: 1,
          fontWeight: 400,
          '&:hover': {
            border: '1px solid #38444d',
          },
        }}
      >
        <Typography
          component={Twemoji}
          text={chatName.length >= 30 ? chatName?.slice(0, 27) + '...' : chatName}
        />
      </Typography>

      <MDialogInput
        inputValue={chatName}
        title="Thay đổi tên trò chuyện?"
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        open={openModal}
      />
    </>
  );
};
