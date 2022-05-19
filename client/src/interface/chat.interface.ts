import { Message } from './message.interface';
import { Info } from './paginate.inteface';
import { User } from './user.interface';

interface LastestMessage extends Omit<Message, 'readBy'> {
  readBy: string[];
}

export interface Chat {
  id: string;
  chatName?: string;
  admin: User;
  isGroupChat: boolean;
  users: User[];
  lastestMessage?: LastestMessage;

  createdAt?: string;
  updatedAt?: string;
}

export interface ChatsResponse {
  info: Info;
  chats: Chat[];
}
