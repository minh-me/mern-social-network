import { FC, useState } from 'react';
import { Avatar, Box, Typography, Button } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Notification, NotificationTypes } from 'interface';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { styles } from './styles';
import { MDialog } from 'components/Common/Modal';
import { useDeleteNotification } from 'RQhooks/notification.rq';
import { Link } from 'react-router-dom';

dayjs.extend(relativeTime);

interface NotiProps {
  notification: Notification;
}

const notifies: Record<string, any> = {
  likePost: 'đã thích một bài viết của bạn.',
  retweetPost: 'đã chia sẽ một bài viết của bạn.',
  follow: 'đã follow bạn.',
  commentPost: 'đã bình luận một bài viết của bạn.',
  commentUser: 'đã nhắc đến bạn.',
};

export const NotificationItem: FC<NotiProps> = ({ notification }) => {
  const { userFrom, type } = notification;
  const [openModal, setOpenModal] = useState(false);
  const { mutateAsync, isLoading } = useDeleteNotification();

  const handleDelete = async (entityId: string) => {
    if (entityId) await mutateAsync(entityId);
    setOpenModal(false);
  };

  const linkDetail = (notification: Notification) => {
    if (
      notification.type === NotificationTypes.commentUser ||
      notification.type === NotificationTypes.follow
    ) {
      return `/users/${notification.userFrom.username}`;
    }
    return `/posts/${notification.entityId}`;
  };

  return (
    <Box sx={styles.itemContainer}>
      <Link to={`/users/${userFrom.username}`}>
        <Avatar alt={userFrom.name} src={userFrom.profilePic.url} />
      </Link>
      <Box sx={{ flex: 1, textDecoration: 'none' }} component={Link} to={linkDetail(notification)}>
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
          {notifies[type]}
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
