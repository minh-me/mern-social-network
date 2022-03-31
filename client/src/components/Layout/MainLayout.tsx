import { Grid, Box } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Sidebar } from '../App';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
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
          <Outlet />
        </Box>
      </Grid>
      <Grid item xs={3}>
        Sidebar right
      </Grid>
    </Grid>
  );
};
