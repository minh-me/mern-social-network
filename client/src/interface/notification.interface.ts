import { User } from './user.interface';

export interface Notification {
  id: string;
  userTo: User;
  userFrom: User;
  notificationType: string;
  opened?: boolean;
  entityId: string;

  createdAt?: string;
  updatedAt?: string;
}
