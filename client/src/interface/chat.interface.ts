import { Message } from './message.interface';
import { Info } from './paginate.inteface';
import { User } from './user.interface';

export interface Chat {
  id: string;
  chatName?: string;
  admin: User;
  slug: string;
  isGroupChat: boolean;
  users: User[];
  lastestMessage?: Message;

  createdAt?: string;
  updatedAt?: string;
}

export interface ChatsResponse {
  info: Info;
  chats: Chat[];
}
