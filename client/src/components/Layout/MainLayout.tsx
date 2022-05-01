import { Grid, Box } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Sidebar } from '../App';
import { Outlet } from 'react-router-dom';
import { styleScroll } from 'utils';

export const MainLayout = () => {
  return (
    <Grid container>
      <Grid
        item
        lg={2}
        md={3}
        sm={2}
        px={2}
        sx={{
          borderRight: 16,
          borderColor: blueGrey[800],
          display: {
            xs: 'none',
            sm: 'inherit',
          },
        }}
      >
        <Sidebar />
      </Grid>
      <Grid item xs={12} lg={7} md={6} sm={10} sx={{ borderRight: 1, borderColor: blueGrey[800] }}>
        <Box
          sx={{
            maxHeight: '100vh',
            scrollBehavior: 'smooth',
            overflowY: 'auto',
            ...styleScroll,
          }}
        >
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};
