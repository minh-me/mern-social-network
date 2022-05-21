import { chatApi } from 'api/chat.api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { handlerError } from 'utils/handleError';
import { options } from './options.type';

export const useChats = ({ page = 1, limit = 1, sort = '-createdAt' }, options?: options) => {
  const queryKey = `chats?page=${page}&limit=${limit}&sort=${sort}`;

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
  const chatIdKey = queryClient.getQueryData('chatIdKey');

  return useMutation(chatApi.updateChat, {
    onError: handlerError,
    onSuccess: (data) => {
      console.log({ data });
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey === chatIdKey;
        },
      });
    },
  });
};
