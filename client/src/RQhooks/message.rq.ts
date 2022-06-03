import { useMutation, useQuery, useQueryClient } from 'react-query';

import { messageApi } from '~/api/message.api';
import { handlerError } from '~/utils/handleError';
import { options } from './options.type';
import { Chat } from '~/interface';
import { socketClient, EVENTS } from '~/socketIO';

export const useMessages = (
  { chatId = '', page = 1, limit = 1, sort = '-createdAt' },
  options?: options
) => {
  const queryClient = useQueryClient();

  const queryKey = `messages?chat=${chatId}&page=${page}&limit=${limit}&sort=${sort}`;
  queryClient.setQueryData('messageKey', queryKey);

  return useQuery(queryKey, messageApi.getMessages, {
    onError: handlerError,
    ...options,
  });
};

export const useAddToReadBy = () => {
  return useMutation(messageApi.addToReadBy, {
    onError: handlerError,
  });
};

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  const messageKey = queryClient.getQueryData('messageKey') as string;
  const chatsKey = queryClient.getQueryData('chatsKey');

  return useMutation(messageApi.createMessage, {
    onError: handlerError,
    onSuccess: (data) => {
      // Update current message
      queryClient.setQueryData(messageKey, (oldMessages: any) => ({
        ...oldMessages,
        messages: [data, ...oldMessages.messages],
      }));

      // Update message in chats
      if (!chatsKey) return;
      queryClient.setQueryData(chatsKey as string, (oldChats: any) => {
        // Get updated chat index
        const updatedChatIndex = oldChats.chats.findIndex((chat: Chat) => chat.id === data.chat.id);

        // Update to new
        if (oldChats.chats[updatedChatIndex])
          oldChats.chats[updatedChatIndex].latestMessage = { ...data, readBy: [data.sender.id] };

        // Success
        return oldChats;
      });
    },
    onSettled: (data) => {
      if (data) socketClient.emit(EVENTS.newMessage, data);
    },
  });
};
