import { Grid, Box } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Outlet } from 'react-router-dom';

import { styleScroll } from '~/utils';
import { Sidebar } from '~/components/Common/SidebarLeft';
import { SidebarListIcons } from '../Common/SidebarLeft/SidebarListIcons';

export const AdminLayout = () => {
  return (
    <Grid container>
      <Grid item lg={2} md={3} sm={2} sx={styles.sidebarContainer}>
        <Sidebar />
      </Grid>
      <Box sx={styles.sidebarBottom}>
        <SidebarListIcons />
      </Box>

      <Grid item xs={12} lg={10} md={9} sm={10} sx={{ borderRight: 1, borderColor: blueGrey[800] }}>
        <Box sx={styles.mainContainer}>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};

const styles = {
  sidebarContainer: {
    borderRight: 16,
    borderColor: blueGrey[800],
    display: {
      xs: 'none',
      sm: 'inherit',
    },
  },
  mainContainer: {
    maxHeight: '100vh',
    scrollBehavior: 'smooth',
    overflowY: 'auto',
    ...styleScroll,
  },
  sidebarBottom: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    background: '#343434',
    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
    zIndex: 1000000,
    borderRadius: '10px 10px 0 0',
    display: {
      xs: 'inherit',
      sm: 'none',
    },
    ul: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
  },
};
