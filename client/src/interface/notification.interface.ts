import { Info } from './paginate.inteface';
import { User } from './user.interface';
export enum NotificationTypes {
  likePost,
  retweetPost,
  follow,
  reply,
  commentPost,
  commentUser,
}

export interface Notification {
  id: string;
  userTo: User;
  userFrom: User;
  type: NotificationTypes;
  opened: boolean;
  entityId: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface NotificationsReponse {
  info: Info;
  notifications: Notification[];
}
