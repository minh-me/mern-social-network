import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { styleScroll } from 'utils';

export const AuthLayout = () => {
  return (
    <Grid
      container
      spacing={0}
      sx={{
        height: '100vh',
        // backgroundImage: 'url("./assets/bg.avif")',
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
        // bgcolor: '#1d1927',
        justifyContent: 'center',
        overflowY: 'scroll',
        ...styleScroll,
        '&::-webkit-scrollbar': {
          width: 1,
        },
      }}
    >
      <Grid item sm={7} xs={12} md={5} lg={4} pt={6}>
        <Outlet />
      </Grid>
    </Grid>
  );
};
