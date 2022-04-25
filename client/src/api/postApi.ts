import axios from 'axios';
import { PostsResponse } from 'interface';
import axiosInstance from 'utils/axiosInstance';

const postUrl = '/api/posts';
export const postApi = {
  getPosts({ pageParam = 1 }): Promise<PostsResponse> {
    console.log({ pageParam });
    return axiosInstance.get(`${postUrl}?page=${pageParam}&limit=1`);
  },

  getPost(postId: string) {
    return axios.get(`${postUrl}/${postId}`);
  },

  createPost(post: {}) {
    return axiosInstance.post(`${postUrl}`, post, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updatePost(postId: string, post: {}) {
    return axios.post(`${postUrl}/${postId}`, post);
  },

  deletePost(postId: string) {
    return axios.delete(`${postUrl}/${postId}`);
  },
};
