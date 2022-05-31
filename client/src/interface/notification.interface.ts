import { Info } from './paginate.inteface';
import { User } from './user.interface';
export enum NotificationTypes {
  likePost = 'likesPost',
  retweetPost = 'retweetPost',
  follow = 'follow',
  reply = 'reply',
  commentPost = 'commentPost',
  commentUser = 'commentUser',
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

export interface NotificationsResponse {
  info: Info;
  notifications: Notification[];
}
