import { messageApi } from 'api/message.api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { handlerError } from 'utils/handleError';
import { options } from './options.type';

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

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  const messageKey = queryClient.getQueryData('messageKey');
  return useMutation('create-message', messageApi.createMessage, {
    onError: handlerError,
    onSettled: () => {
      return queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey === messageKey;
        },
      });
    },
  });
};
