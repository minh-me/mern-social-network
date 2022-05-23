import { Chat } from './chat.interface';
import { Info } from './paginate.inteface';
import { User } from './user.interface';

export interface Message {
  id: string;
  sender: User;
  readBy: User[];
  chat: Chat;
  text?: string;
  isRename?: boolean;
  image?: {
    url: string;
  };

  createdAt?: string;
  updatedAt?: string;
}

export interface MessagesResponse {
  messages: Message[];
  info: Info;
}
