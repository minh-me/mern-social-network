import { FC, useState } from 'react';
import { Avatar, Box, Typography, Button } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { styles } from './styles';
import { Link, useNavigate } from 'react-router-dom';

import { MDialog } from '~/components/Common/Modal';
import { useDeleteNotification, useUpdateNotification } from '~/RQhooks/notification.rq';
import { Notification, NotificationTypes } from '~/interface';

dayjs.extend(relativeTime);

interface NotificationProps {
  notification: Notification;
}

const notifyMessages: Record<string, any> = {
  likePost: 'đã thích một bài viết của bạn.',
  retweetPost: 'đã chia sẻ một bài viết của bạn.',
  follow: 'đã follow bạn.',
  commentPost: 'đã bình luận một bài viết của bạn.',
  commentUser: 'đã nhắc đến một bình luận của bạn.',
  likeComment: 'đã thích bình luận của bạn.',
};

export const NotificationItem: FC<NotificationProps> = ({ notification }) => {
  const { userFrom, type } = notification;
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const { mutateAsync: deleteAsync, isLoading } = useDeleteNotification();
  const { mutate: update } = useUpdateNotification();

  const handleDelete = async (entityId: string) => {
    if (entityId) await deleteAsync(entityId);
    setOpenModal(false);
  };

  const linkNotifyDetail = (notification: Notification): string => {
    if (
      notification.type === NotificationTypes.commentUser ||
      notification.type === NotificationTypes.follow
    ) {
      return `/users/${notification.userFrom.username}`;
    }

    return `/posts/${notification.entityId}`;
  };

  const handleNavigateNotifyDetail = () => {
    update({ filter: { id: notification.id }, body: { opened: true } });

    navigate(linkNotifyDetail(notification));
  };

  return (
    <Box sx={styles.itemContainer}>
      <Link to={`/users/${userFrom.username}`}>
        <Avatar alt={userFrom.name} src={userFrom.profilePic.url} />
      </Link>
      <Box sx={{ flex: 1, cursor: 'pointer' }} onClick={handleNavigateNotifyDetail}>
        <Typography
          color={notification.opened ? '#8b8b8b' : '#f9f9f9'}
          component="span"
          fontSize={16}
          fontWeight={600}
          mx={1}
        >
          {userFrom.name}
        </Typography>
        <Typography
          component="span"
          sx={styles.text}
          color={notification.opened ? '#8b8b8b' : '#f9f9f9'}
        >
          {notifyMessages[type]}
        </Typography>
      </Box>

      <Typography className="time" sx={styles.times} component="span">
        {dayjs(notification.createdAt).fromNow()}
      </Typography>

      <Button onClick={() => setOpenModal(true)} className="btn-delete" sx={styles.iconDelete}>
        <HighlightOffOutlinedIcon />
      </Button>

      <MDialog
        type="delete"
        entityId={notification.id}
        title="Xóa thông báo!"
        confirmButton={handleDelete}
        onClose={() => setOpenModal(false)}
        open={openModal}
        isLoading={isLoading}
      >
        Xóa thông báo này khỏi mục thông báo của bạn?
      </MDialog>
    </Box>
  );
};
