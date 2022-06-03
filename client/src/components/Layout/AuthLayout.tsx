import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { storage, styleScroll } from '~/utils';

export const AuthLayout = () => {
  const token = storage.getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!token) navigate('/', { replace: true });
  }, [token, navigate]);

  return (
    <Grid
      container
      spacing={0}
      sx={{
        height: '100vh',
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
