import axios from 'axios';
import { Comment, CommentsResponse } from 'interface';
import axiosInstance from 'utils/axiosInstance';

const commentUrl = '/api/comments';
export const commentApi = {
  createComment(comment: FormData): Promise<Comment> {
    return axiosInstance.post(`api/comments`, comment, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  getCommentsByPost({ queryKey = ['comments?page=1&limit=1'] }): Promise<CommentsResponse> {
    return axios.get(`api/${queryKey[0]}`);
  },
  getComments(filter: {}) {
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

  likeComment(commentId: string) {
    return axiosInstance.patch(`${commentUrl}/${commentId}/like`);
  },
};
