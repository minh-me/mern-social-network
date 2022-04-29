import { Box, IconButton } from '@mui/material';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

import { User } from 'interface';
import { Title } from 'components/App';
import { NotificationItem } from 'components/Common';

const userFrom: User = {
  profilePic:
    'https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png',
  name: 'minh',
  email: 'minhch.vn@gmail.com',
  role: 'admin',
  createdAt: '2022-03-08T14:12:58.562Z',
  updatedAt: '2022-03-08T14:25:39.750Z',
  id: '6227646a0588488cd53eb293',
};

const userTo: User = {
  name: 'minh',
  email: 'minhch.vn@gmail.com',
  role: 'admin',
  createdAt: '2022-03-08T14:12:58.562Z',
  updatedAt: '2022-03-08T14:25:39.750Z',
  id: '6227646a0588488cd53eb293',
  profilePic:
    'https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png',
};

const notification = {
  id: '123123',
  userFrom,
  userTo,
  notificationType: 'post',
  opened: true,
  entityId: '123o0192u31023',
};

export const NotificationPage = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #38444d',
        }}
      >
        <Title title="Notifications" />
        <IconButton size="small" sx={{ color: 'white', mr: 3 }}>
          <DoneAllOutlinedIcon />
        </IconButton>
      </Box>

      <Box>
        <NotificationItem notification={notification} />
      </Box>
    </>
  );
};
