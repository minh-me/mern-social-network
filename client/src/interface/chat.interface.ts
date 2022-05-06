import { Info } from './paginate.inteface';

export interface Chat {
  id: string;
  chatName: string;
  slug: string;
  isGroupChat: boolean;
  users: [string];
  lastestMessage?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface ChatsResponse {
  info: Info;
  chats: Chat[];
}
