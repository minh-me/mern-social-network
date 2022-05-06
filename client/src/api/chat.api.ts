import axios from 'axios';
import { Chat, ChatsResponse } from 'interface';
import axiosInstance from 'utils/axiosInstance';

const chatUrl = '/api/chats';
export const chatApi = {
  getChats({ queryKey = ['chats?page=1&limit=1'] }): Promise<ChatsResponse> {
    return axiosInstance.get(`api/${queryKey}`);
  },

  getChat(chatId: string): Promise<Chat> {
    return axios.get(`${chatUrl}/${chatId}`);
  },

  createChat(chat: {}): Promise<Chat> {
    return axiosInstance.post(`${chatUrl}`, chat, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  updateChat(chatId: string, chat: {}): Promise<Chat> {
    return axios.post(`${chatUrl}/${chatId}`, chat, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  deleteChat(chatId: string) {
    return axios.delete(`${chatUrl}/${chatId}`);
  },
};
