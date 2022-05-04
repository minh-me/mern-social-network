import { commentApi } from 'api/comment.api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { handlerError } from 'utils/handleError';
import { options } from './options.type';

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation(commentApi.createComment, {
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: handlerError,
    onSettled: () => {
      const postCommentKey = queryClient.getQueryData('postCommentKey');
      if (postCommentKey)
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey === postCommentKey,
        });
    },
  });
};

export const useLikeComment = () => {
  return useMutation('like-comment', commentApi.likeComment, {
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: handlerError,
  });
};

export const useCommentsByPost = (
  { postId = '', page = 1, limit = 1, sort = 'createdAt' },
  options?: options
) => {
  const queryClient = useQueryClient();
  const queryKey = `comments?post=${postId}&page=${page}&limit=${limit}&sort=${sort}`;
  queryClient.setQueryData('postCommentKey', queryKey);
  return useQuery(queryKey, commentApi.getCommentsByPost, {
    onError: handlerError,
    ...options,
    enabled: !!postId,
  });
};
