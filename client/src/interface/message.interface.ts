import { Info } from './paginate.inteface';
import { User } from './user.interface';

export interface Message {
  sender: User;
  readBy?: string;
  chat: string;
  text?: string;
  image?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface MessagesResponse {
  messages: Message[];
  info: Info;
}
