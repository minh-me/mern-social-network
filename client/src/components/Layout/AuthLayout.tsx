import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
type Props = {};

export const AuthLayout = (props: Props) => {
  return (
    <Grid
      container
      sx={{
        height: '100vh',
        backgroundImage: 'url("./assets/bg.avif")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        justifyContent: 'center',
      }}
    >
      <Grid item sm={8} xs={12} md={4} pt={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
};
