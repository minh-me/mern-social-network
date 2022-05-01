import axios from 'axios';
import { Comment, CommentsResponse } from 'interface';
import axiosInstance from 'utils/axiosInstance';

const commentUrl = '/api/comments';
export const commentApi = {
  getCommentsByPost({ queryKey = ['comments/?page=1&limit=1'] }): Promise<CommentsResponse> {
    return axiosInstance.get(`api/${queryKey[0]}`);
  },

  getReplies({ queryKey = ['comments/?page=1&limit=1'] }): Promise<CommentsResponse> {
    return axiosInstance.get(`api/${queryKey[0]}`);
  },

  createComment(comment: {}): Promise<Comment> {
    return axiosInstance.post(`api/comments`, comment, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  replyComment(commentId = '', comment: {}): Promise<Comment> {
    return axiosInstance.post(`api/comments/${commentId}/reply`, comment, {
      headers: { 'Content-Type': 'application/json' },
    });
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
};
