import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Grid, Box } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Sidebar } from 'components/Common/SidebarLeft';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { storage, styleScroll } from 'utils';
import { useAppContext } from 'hooks/useAppContext';
import { authApi } from 'api/auth.api';
import { addAuth, resetAppState } from 'context';
import { SidebarRight } from 'components/Common/SidebarRight';
import { useLogout } from 'RQhooks';
import { useQueryClient } from 'react-query';

export const MainLayout = () => {
  const { dispatch } = useAppContext();
  const token = storage.getToken();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: logout } = useLogout();

  const handleLogout = async () => {
    // Clear hoooks
    dispatch(resetAppState());

    // Clear localstorage
    storage.clearToken();

    // Clear react query
    queryClient.clear();

    // Clear server
    await logout();

    navigate('/auth', { replace: true });
    return;
  };

  // Refresh token
  useEffect(() => {
    const refreshToken = async () => {
      const data = await authApi.getRefreshToken().catch((error) => {
        // handleLogout(error);
      });

      if (data) {
        dispatch(addAuth(data.user));

        storage.setToken(data.ac_token);
        toast.success(`Hi ${data.user.name}, Have a nice day!`, {
          position: 'bottom-right',
        });
      }
    };

    if (token) refreshToken();
  }, [token, dispatch]);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Grid container>
      <Grid item lg={2} md={3} sm={2} px={2} sx={styles.sidebarContainer}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} lg={7} md={6} sm={10} sx={{ borderRight: 1, borderColor: blueGrey[800] }}>
        <Box sx={styles.mainContainer}>
          <Outlet />
        </Box>
      </Grid>

      <Grid item lg={3} md={3} sx={{ display: { xs: 'none', sm: 'none', md: 'inherit' } }}>
        <SidebarRight />
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
};
