import { Box, IconButton } from '@mui/material';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import { ChatAvatar } from './ChatAvatar';
import { ChatName } from './ChatName';

type Props = {};

export const MessageHeader = (props: Props) => {
  return (
    <Box
      py={1}
      px={2}
      sx={{ borderBottom: '1px solid #38444d', display: 'flex', alignItems: 'center' }}
    >
      <ChatAvatar />
      <Box sx={{ flex: 1 }}>
        <ChatName />
      </Box>

      <Box>
        <IconButton color="primary">
          <PhoneOutlinedIcon />
        </IconButton>
        <IconButton color="primary">
          <VideoCallOutlinedIcon />
        </IconButton>
        <IconButton color="primary">
          <ReportOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
