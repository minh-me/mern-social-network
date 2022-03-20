import { Grid, Box } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Sidebar } from '../Common';
import { Routes, Route } from 'react-router-dom';
import { ChatPage, HomePage, MessagePage, NotificationPage, ProfilePage, SearchPage } from 'pages';

type Props = {};

export const MainLayout = (props: Props) => {
  return (
    <Grid container>
      <Grid item xs={2} px={2} sx={{ borderRight: 16, borderColor: blueGrey[800] }}>
        <Sidebar />
      </Grid>
      <Grid item xs={7}>
        <Box
          sx={{
            height: '100vh',
            scrollBehavior: 'smooth',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              width: 8,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#38444d',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: blueGrey['A700'],
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: blueGrey[700],
            },
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/message" element={<MessagePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Box>
      </Grid>
      <Grid item xs={3}>
        Sidebar right
      </Grid>
    </Grid>
  );
};
