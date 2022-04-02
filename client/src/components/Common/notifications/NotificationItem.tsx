import { FC, useState } from 'react';
import { Avatar, Box, Typography, Button } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Notification } from 'interface';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { styles } from './styles';
import { MDialog } from 'components/Common/Modal';
dayjs.extend(relativeTime);

interface NotiProps {
  notification: Notification;
}

export const NotificationItem: FC<NotiProps> = ({
  notification: { userFrom, notificationType },
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = (entityId: string) => {
    if (entityId) console.log(entityId);
    setOpenModal(false);
  };

  return (
    <Box sx={styles.itemContainer}>
      <Avatar alt={userFrom.name} src={userFrom.profilePic} />
      <Box sx={{ flex: 1 }}>
        <Typography component="span" fontSize={16} fontWeight={600} mx={1}>
          {userFrom.name}
        </Typography>
        <Typography component="span" sx={styles.text}>
          đã theo dõi bạn.
        </Typography>
      </Box>

      <Typography className="time" sx={styles.times} component="span">
        {dayjs(userFrom.createdAt).fromNow()}
      </Typography>

      <Button onClick={() => setOpenModal(true)} className="btn-delete" sx={styles.iconDelete}>
        <HighlightOffOutlinedIcon />
      </Button>

      <MDialog
        type="delete"
        entityId="123!"
        title="Xóa thông báo!"
        onClose={handleClose}
        open={openModal}
      >
        Xóa thông báo này khỏi mục thông báo của bạn?
      </MDialog>
    </Box>
  );
};
