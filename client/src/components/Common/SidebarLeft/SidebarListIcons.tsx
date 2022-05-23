import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { Badge, Link, Typography } from '@mui/material';
import { MDialog } from 'components/Common/Modal';
import { useLogout } from 'RQhooks';
import { storage } from 'utils';
import { useAuthContext } from 'hooks/useAppContext';
import { resetAppState } from 'context';
import { QueryClient } from 'react-query';
import { useCountNotifications } from 'RQhooks/notification.rq';

export const SidebarListIcons = () => {
  const { dispatch } = useAuthContext();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  const { mutateAsync } = useLogout();
  const { data } = useCountNotifications({ opened: false });

  const handleClose = async () => {
    // Clear hoooks
    dispatch(resetAppState());

    // Clear localstorage
    storage.clearToken();

    // Clear react query
    queryClient.clear();

    // Clear server
    await mutateAsync();

    navigate('/auth', { replace: true });
  };

  return (
    <List
      sx={{
        '&>a,& svg': {
          color: 'white',
          textDecoration: 'none',
        },
        '&>a.active,&>a.active svg': {
          color: '#d81b60',
        },
        '&>a:hover>div, &>a:hover svg': {
          color: '#d81b60',
        },
        '& span': {
          fontSize: '18px',
          fontWeight: '500',
        },
      }}
    >
      <NavLink to="/">
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <HomeSharpIcon sx={{ color: 'white' }} />
          </ListItemIcon>
        </ListItemButton>
      </NavLink>

      <NavLink to="/search">
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <SearchSharpIcon sx={{ color: 'white' }} />
          </ListItemIcon>
        </ListItemButton>
      </NavLink>

      <NavLink to="/notification">
        <ListItemButton>
          <Badge
            badgeContent={data?.result}
            sx={{ span: { fontSize: 12, background: '#ec407a' }, color: 'white' }}
          >
            <NotificationsSharpIcon />
          </Badge>
        </ListItemButton>
      </NavLink>

      <NavLink to="/chat">
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <MailOutlineRoundedIcon sx={{ color: 'white' }} />
          </ListItemIcon>
        </ListItemButton>
      </NavLink>

      <NavLink to="/users/profile">
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <AccountBoxRoundedIcon sx={{ color: 'white' }} />
          </ListItemIcon>
        </ListItemButton>
      </NavLink>

      <Link onClick={() => setOpenModal(true)}>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <LogoutIcon sx={{ color: 'white' }} />
          </ListItemIcon>
        </ListItemButton>
      </Link>

      <MDialog
        position="center"
        title="Đăng xuất tài khoản?"
        onClose={() => setOpenModal(false)}
        confirmButton={handleClose}
        open={openModal}
        textAlign="center"
      >
        <Typography component="span" sx={{ minWidth: 300, display: 'inline-block' }}>
          Đăng xuất tài khoản.
        </Typography>
      </MDialog>
    </List>
  );
};
