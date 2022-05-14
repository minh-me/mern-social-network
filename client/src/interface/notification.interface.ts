import { Info } from './paginate.inteface';
import { User } from './user.interface';
enum notificationTypes {
  likePost,
  retweetPost,
  follow,
  reply,
  newMessage,
  commentPost,
  commentUser,
}

export interface Notification {
  id: string;
  userTo: User;
  userFrom: User;
  notificationType: notificationTypes;
  opened: boolean;
  entityId: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface NotificationsReponse {
  info: Info;
  notifications: Notification[];
}
