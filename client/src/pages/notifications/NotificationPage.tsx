import { Box, Typography } from '@mui/material';

import { LoadMoreButton } from 'components/Common/Buttons';
import { Title } from 'components/App';
import { NotificationItem } from './components/NotificationItem';
import { useNotifications } from 'RQhooks/notification.rq';
import { limitNotifications } from 'constants/pagination';
import { useState } from 'react';
import { UserListSkeleton } from 'components/Common/Variants';
import { DoneAllIcon } from './components/DoneAllIcon';

export const NotificationPage = () => {
  const [limit, setLimit] = useState(limitNotifications);
  const { data, isFetching, isLoading } = useNotifications({ limit });

  if (isLoading || !data)
    return (
      <>
        <Box sx={styles.titleContainer}>
          <Title title="Notifications" />
        </Box>
        <UserListSkeleton />
      </>
    );

  const { notifications, info } = data;

  return (
    <>
      <Box sx={styles.titleContainer}>
        <Title title="Notifications" />
        <DoneAllIcon />
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
