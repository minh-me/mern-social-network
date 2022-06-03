import axios from 'axios';
import { Comment, CommentsResponse } from '~/interface';
import axiosInstance from '~/utils/axiosInstance';

const commentUrl = '/api/comments';
export const commentApi = {
  createComment(comment: FormData): Promise<Comment> {
    return axiosInstance.post(`api/comments`, comment, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  getComments({ queryKey = ['comments?page=1&limit=1'] }): Promise<CommentsResponse> {
    const endpoint = queryKey[0];

    return axios.get(`api/${endpoint}`);
  },

  getCommentsByPost(filter: {}) {
    return axios.get(`${commentUrl}${filter}`);
  },

  getComment(commentId: string) {
    return axios.get(`${commentUrl}/${commentId}`);
  },

  updateComment(commentId: string, comment: {}) {
    return axios.post(`${commentUrl}/${commentId}`, comment, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  deleteComment(commentId: string) {
    return axios.delete(`${commentUrl}/${commentId}`);
  },

  likeComment(commentId: string): Promise<Comment> {
    return axiosInstance.patch(`${commentUrl}/${commentId}/like`);
  },
};
