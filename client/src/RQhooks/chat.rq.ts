import { chatApi } from '~/api/chat.api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { handlerError } from '~/utils/handleError';
import { options } from './options.type';
import { Chat } from '~/interface/chat.interface';

export const useChats = ({ page = 1, limit = 1, sort = '-createdAt' }, options?: options) => {
  const queryKey = `chats?page=${page}&limit=${limit}&sort=${sort}`;

  const queryClient = useQueryClient();
  queryClient.setQueryData('chatsKey', queryKey);

  return useQuery(queryKey, chatApi.getChats, {
    onError: handlerError,
    ...options,
  });
};

export const useChat = ({ chatId = '' }, options?: options) => {
  const queryClient = useQueryClient();
  queryClient.setQueryData('chatIdKey', `chats/${chatId}`);
  return useQuery(`chats/${chatId}`, () => chatApi.getChat(chatId), {
    onError: handlerError,
    ...options,
  });
};

export const useCreateChat = () => {
  return useMutation('create-chat', chatApi.createChat, {
    onError: handlerError,
  });
};

export const useUpdateChat = () => {
  const queryClient = useQueryClient();
  const chatIdKey = queryClient.getQueryData('chatIdKey') as string;
  const chatsKey = queryClient.getQueryData('chatsKey');

  return useMutation(chatApi.updateChat, {
    onError: handlerError,
    onSuccess: (data) => {
      // Update query cache current chat
      queryClient.setQueryData(chatIdKey, () => data);

      // Update chat list
      if (!chatsKey) return;
      queryClient.setQueryData(chatsKey as string, (oldChats: any) => {
        // Get updated chat index
        const updatedChatIndex = oldChats.chats.findIndex((chat: Chat) => chat.id === data.id);

        // Update to new
        oldChats.chats[updatedChatIndex] = data;

        // Success
        return oldChats;
      });
    },
  });
};
