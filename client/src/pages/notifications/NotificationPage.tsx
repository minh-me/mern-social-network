import { Box, IconButton, Typography } from '@mui/material';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

import { LoadMoreButton, Title } from 'components/App';
import { NotificationItem } from './components/NotificationItem';
import { useMarkAsOpened, useNotifications } from 'RQhooks/notification.rq';
import { limitNotifications } from 'contants/pagination';
import { useState } from 'react';
import { UserListSkeleton } from 'components/Common/Variants';
import { MDialog } from 'components/Common/Modal';

export const NotificationPage = () => {
  const [limit, setLimit] = useState(limitNotifications);
  const { data, isFetching, isLoading } = useNotifications({ limit });
  const { mutateAsync } = useMarkAsOpened();
  const [openModal, setOpenModal] = useState(false);

  if (isLoading || !data)
    return (
      <>
        <Box sx={styles.titleContainer}>
          <Title title="Notifications" />
        </Box>
        <Box mx={2}>
          <UserListSkeleton />
        </Box>
      </>
    );

  const handleConfirm = async () => {
    await mutateAsync({ filter: { opened: false }, body: { opened: true } });
    setOpenModal(false);
  };

  const { notifications, info } = data;

  return (
    <>
      <Box sx={styles.titleContainer}>
        <Title title="Notifications" />
        <IconButton
          size="small"
          onClick={() => setOpenModal(true)}
          sx={{ color: '#ff2b72', mr: 3 }}
        >
          <DoneAllOutlinedIcon />
        </IconButton>
      </Box>

      <Box>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </Box>

      <LoadMoreButton
        isFetching={isFetching}
        totalResults={info.totalResults}
        limit={limit}
        onChangeLimit={(limit) => setLimit(limit)}
      />

      {info.totalResults === 0 && (
        <Typography textAlign="center" fontSize={16}>
          Nothing to show.
        </Typography>
      )}

      {/* Modal */}
      <MDialog
        title="Đánh dấu thông báo!"
        confirmButton={handleConfirm}
        onClose={() => setOpenModal(false)}
        open={openModal}
        isLoading={isLoading}
      >
        Đánh dấu tất cả thông báo là đã đọc?
      </MDialog>
    </>
  );
};

const styles = {
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #38444d',
  },
};
