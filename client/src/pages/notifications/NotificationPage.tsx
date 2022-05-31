import { Box, Typography } from '@mui/material';
import { LoadMoreButton } from 'components/Common/Buttons';
import { Title } from 'components/App';
import { NotificationItem } from './components/NotificationItem';
import { useNotifications } from 'RQhooks/notification.rq';
import { limitNotifications } from 'constants/pagination';
import { useEffect, useState } from 'react';
import { UserListSkeleton } from 'components/Common/Variants';
import { DoneAllIcon } from './components/DoneAllIcon';
import { EVENTS, socketClient } from 'socketIO';
import { notificationApi } from 'api/notification.api';
import { useQueryClient } from 'react-query';
import { Notification } from 'interface';

export const NotificationPage = () => {
  const [limit, setLimit] = useState(limitNotifications);
  const { data, isFetching, isLoading } = useNotifications({ limit });

  const queryClient = useQueryClient();

  useEffect(() => {
    socketClient.on(EVENTS.notificationReceived, async () => {
      // Get notification latest
      const notification = await notificationApi.getNotificationLatest();

      const notificationsKey = queryClient.getQueryData('notificationsKey');

      // Update notification in cache
      if (notificationsKey)
        queryClient.setQueryData(notificationsKey as string, (oldData: any) => {
          oldData.notifications.unshift(notification);

          return oldData;
        });
    });
  }, [queryClient]);

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
