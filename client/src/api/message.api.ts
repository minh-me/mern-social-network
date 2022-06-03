import axios from 'axios';
import { Message, MessagesResponse } from '~/interface';
import axiosInstance from '~/utils/axiosInstance';

const messageUrl = '/api/messages';
export const messageApi = {
  getMessages({ queryKey = ['messages?page=1'] }): Promise<MessagesResponse> {
    const endpoint = queryKey[0];

    return axiosInstance.get(`api/${endpoint}`);
  },

  getMessage(messageId: string): Promise<Message> {
    return axios.get(`${messageUrl}/${messageId}`);
  },

  createMessage(message: {}): Promise<Message> {
    return axiosInstance.post(`${messageUrl}`, message, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  updateMessage(messageData: { filter: { messageId: string }; body: {} }): Promise<Message> {
    const { filter, body } = messageData;

    return axios.post(`${messageUrl}/${filter.messageId}`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  addToReadBy(chatId: string): Promise<Message> {
    return axiosInstance.patch(`${messageUrl}/${chatId}/readBy`, {});
  },

  deleteMessage(messageId: string) {
    return axios.delete(`${messageUrl}/${messageId}`);
  },
};
