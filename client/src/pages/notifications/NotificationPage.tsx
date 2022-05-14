import { Box, IconButton, Typography } from '@mui/material';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

import { User } from 'interface';
import { LoadMoreButton, Title } from 'components/App';
import { NotificationItem } from './components/NotificationItem';
import { useNotifications } from 'RQhooks/notification.rq';
import { limitNotifications } from 'contants/pagination';
import { useState } from 'react';
import { UserListSkeleton } from 'components/Common/Variants';

export const NotificationPage = () => {
  const [limit, setLimit] = useState(1);
  const { data, isFetching, isLoading } = useNotifications({ limit });

  if (isLoading || !data)
    return (
      <>
        <Box sx={styles.titleContainer}>
          <Title title="Notifications" />
          <IconButton size="small" sx={{ color: 'white', mr: 3 }}>
            <DoneAllOutlinedIcon />
          </IconButton>
        </Box>
        <Box mx={2}>
          <UserListSkeleton />
        </Box>
      </>
    );

  const { notifications, info } = data;

  console.log({ notifications, info });
  return (
    <>
      <Box sx={styles.titleContainer}>
        <Title title="Notifications" />
        <IconButton size="small" sx={{ color: 'white', mr: 3 }}>
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
