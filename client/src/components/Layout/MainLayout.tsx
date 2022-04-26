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
        sm={2}
        md={2}
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
      <Grid item xs={12} sm={10} md={7} sx={{ borderRight: 1, borderColor: blueGrey[800] }}>
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
      <Grid
        item
        xs={0}
        sm={3}
        sx={{
          display: {
            xs: 'none',
            md: 'inherit',
          },
        }}
      >
        <Box px={2} my={3} sx={{ maxWidth: '100%' }}>
          {/* <FormSearch fontSize={14} /> */}
        </Box>
        <Box px={1}>
          {/* <UserList users={userFroms} /> */}
          {/* <PostList posts={posts} /> */}
        </Box>
      </Grid>
    </Grid>
  );
};
