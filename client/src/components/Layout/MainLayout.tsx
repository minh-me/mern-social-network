import { Grid, Box } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Sidebar } from '../App';
import { Navigate, Outlet } from 'react-router-dom';
import { storage, styleScroll } from 'utils';
import { useAuthContext } from 'hooks/useAppContext';
import { authApi } from 'api/auth.api';
import { addAuth } from 'context';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const MainLayout = () => {
  const { dispatch } = useAuthContext();
  const token = storage.getToken();

  // Refresh token
  useEffect(() => {
    const refreshToken = async () => {
      const data = await authApi.getRefreshToken();

      dispatch(addAuth(data.user));

      storage.setToken(data.ac_token);
      toast.success(`Hi ${data.user.name}, Have a nice day!`, {
        position: 'bottom-right',
      });
    };

    if (token) refreshToken();
  }, [token, dispatch]);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

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
