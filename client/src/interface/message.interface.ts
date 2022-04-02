export interface Message {
  sender: string;
  readBy?: string;
  chat: string;
  text?: string;
  image?: string;

  createdAt?: string;
  updatedAt?: string;
}
