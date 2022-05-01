import { commentApi } from 'api/comment.api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { handlerError } from 'utils/handleError';
import { options } from './options.type';

type params = {
  postId: string;
  page?: number;
  limit?: number;
  sort?: string;
};

export const useCommentsByPost = (
  { postId, page = 1, limit = 1, sort = '-createdAt' }: params,
  options?: options
) => {
  const queryClient = useQueryClient();

  const queryKey = `comments/${postId}/post?page=${page}&limit=${limit}&sort=${sort}`;
  queryClient.setQueryData('commentsKey', queryKey);

  return useQuery(queryKey, commentApi.getCommentsByPost, {
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: handlerError,
    ...options,
  });
};
