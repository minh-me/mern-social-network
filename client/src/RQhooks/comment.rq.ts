import { commentApi } from 'api/comment.api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { handlerError } from 'utils/handleError';
import { options } from './options.type';

interface paginateParams {
  page?: number;
  limit?: number;
  sort?: string;
}

interface commentsPostParams extends paginateParams {
  postId: string;
}

export const useCommentsByPost = (
  { postId, page = 1, limit = 10, sort = '-createdAt' }: commentsPostParams,
  options?: options
) => {
  const queryClient = useQueryClient();

  const queryKey = `comments/?post=${postId}&page=${page}&limit=${limit}&sort=${sort}`;
  queryClient.setQueryData('commentsKey', queryKey);

  return useQuery(queryKey, commentApi.getCommentsByPost, {
    onError: handlerError,
    ...options,
  });
};

export const useCreateComment = () => {
  return useMutation(commentApi.createComment, {
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: handlerError,
  });
};

export const useCreateReplyComment = (commentId: string) => {
  return useMutation((newReply: { text: string }) => commentApi.replyComment(commentId, newReply), {
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: handlerError,
  });
};
