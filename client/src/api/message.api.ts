import axios from 'axios';
import { Message, MessagesResponse } from 'interface';
import axiosInstance from 'utils/axiosInstance';

const messageUrl = '/api/messages';
export const messageApi = {
  getMessages({ queryKey = ['messages?page=1&limit=1'] }): Promise<MessagesResponse> {
    return axiosInstance.get(`api/${queryKey[0]}`);
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
    return axios.post(`${messageUrl}/${messageData.filter.messageId}`, messageData.body, {
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
