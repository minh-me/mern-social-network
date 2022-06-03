import { postApi } from '~/api/post.api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { handlerError } from '~/utils/handleError';
import { options } from './options.type';

export const usePosts = (
  { postedBy = '', followingOnly = true, search = '', page = 1, limit = 1, sort = '-createdAt' },
  options?: options
) => {
  const searchQuery = search ? `&search=${search}` : '';
  const postedByQuery = postedBy ? `&postedBy=${postedBy}` : '';

  const queryKey = `posts?page=${page}&limit=${limit}&sort=${sort}&followingOnly=${followingOnly}${searchQuery}${postedByQuery}`;

  return useQuery(queryKey, postApi.getPosts, {
    onError: handlerError,
    ...options,
  });
};

export const useProfilePosts = (
  { postedBy = '', page = 1, limit = 1, onlyReply = false, sort = '-pinned,-createdAt' },
  options?: options
) => {
  const postedByQuery = postedBy ? `&postedBy=${postedBy}` : '';

  const queryKey = `posts/profile?page=${page}&sort=${sort}&limit=${limit}&onlyReply=${onlyReply}${postedByQuery}`;

  return useQuery(queryKey, postApi.getProfilePosts, {
    onError: handlerError,
    ...options,
  });
};

export const usePostById = ({ postId = '' }, options?: options) => {
  return useQuery(`posts/${postId}`, () => postApi.getPost(postId), {
    onError: handlerError,
    ...options,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation(postApi.createPost, {
    onError: handlerError,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.toString().startsWith('posts'),
      });
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation(postApi.likePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.toString().startsWith('posts'),
      });
    },
    onError: handlerError,
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation(postApi.updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.toString().startsWith('posts'),
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation(postApi.deletePost, {
    onError: handlerError,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.toString().startsWith('posts'),
      });
    },
  });
};

export const useRetweetPost = () => {
  const queryClient = useQueryClient();

  return useMutation(postApi.retweetPost, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.toString().startsWith('posts'),
      });
    },
    onError: handlerError,
  });
};

export const useDeleteRetweetPost = () => {
  const queryClient = useQueryClient();

  return useMutation(postApi.deleteRetweetPost, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.toString().startsWith('posts'),
      });
    },
    onError: handlerError,
  });
};
