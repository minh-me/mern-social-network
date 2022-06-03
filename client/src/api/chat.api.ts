import axios from 'axios';
import { Chat, ChatsResponse } from '~/interface';
import axiosInstance from '~/utils/axiosInstance';

const chatUrl = '/api/chats';
export const chatApi = {
  getChats({ queryKey = ['chats?page=1&limit=1'] }): Promise<ChatsResponse> {
    const endpoint = queryKey[0];

    return axiosInstance.get(`api/${endpoint}`);
  },

  getChat(chatId: string): Promise<Chat> {
    return axiosInstance.get(`${chatUrl}/${chatId}`);
  },

  createChat(chat: {}): Promise<Chat> {
    return axiosInstance.post(`${chatUrl}`, chat, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  updateChat(chatData: { filter: { chatId: string }; body: {} }): Promise<Chat> {
    const { filter, body } = chatData;

    return axiosInstance.patch(`${chatUrl}/${filter.chatId}`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  deleteChat(chatId: string) {
    return axios.delete(`${chatUrl}/${chatId}`);
  },
};
