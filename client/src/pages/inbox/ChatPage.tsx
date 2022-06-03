import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IconButton from '@mui/material/IconButton';

import { Title } from '~/components/App';
import { ChatList } from './components';

export const ChatPage = () => {
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
        <Title title="Inbox" />
        <Link to="/chat/new">
          <IconButton size="small" sx={{ color: 'white', mr: 3 }}>
            <AddBoxOutlinedIcon />
          </IconButton>
        </Link>
      </Box>

      {/* Chat list */}
      <ChatList />
    </>
  );
};
