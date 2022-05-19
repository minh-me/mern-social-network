import { messageApi } from 'api/message.api';
import { useMutation, useQuery } from 'react-query';
import { handlerError } from 'utils/handleError';
import { options } from './options.type';

export const useMessages = (
  { chatId = '', page = 1, limit = 1, sort = '-createdAt' },
  options?: options
) => {
  const queryKey = `messages?chat=${chatId}&page=${page}&limit=${limit}&sort=${sort}`;

  return useQuery(queryKey, messageApi.getMessages, {
    onError: handlerError,
    ...options,
  });
};

export const useMessage = ({ messageId = '' }, options?: options) => {
  return useQuery(`messages/${messageId}`, () => messageApi.getMessage(messageId), {
    onError: handlerError,
    ...options,
  });
};

export const useCreateMessage = () => {
  return useMutation('create-message', messageApi.createMessage, {
    onError: handlerError,
  });
};

export const useUpdateMessage = () => {
  return useMutation(messageApi.updateMessage, {
    onError: handlerError,
    onSuccess: (data) => {
      console.log({ data });
    },
  });
};
