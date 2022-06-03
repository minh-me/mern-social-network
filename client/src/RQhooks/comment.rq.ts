import { commentApi } from '~/api/comment.api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { handlerError } from '~/utils/handleError';
import { options } from './options.type';

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation(commentApi.createComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.toString().startsWith(`comments?post=${data?.post}`),
      });
    },
    onError: handlerError,
  });
};

export const useComments = (
  { postId = '', page = 1, limit = 1, sort = 'createdAt' },
  options?: options
) => {
  const queryKey = `comments?post=${postId}&page=${page}&limit=${limit}&sort=${sort}`;

  return useQuery(queryKey, commentApi.getComments, {
    onError: handlerError,
    ...options,
    enabled: !!postId,
    cacheTime: 0,
  });
};

export const useLikeComment = () => {
  const queryClient = useQueryClient();

  return useMutation(commentApi.likeComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.toString().startsWith(`comments?post=${data?.post}`),
      });
    },
    onError: handlerError,
  });
};
