export interface Chat {
  chatName: string;
  isGroupChat: boolean;
  users: [string];
  lastestMessage?: string;

  createdAt?: string;
  updatedAt?: string;
}
