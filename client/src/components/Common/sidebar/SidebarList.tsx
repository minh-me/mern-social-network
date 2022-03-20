import { NavLink } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';

const SidebarList = () => {
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
          <ListItemText primary="Home" />
        </ListItemButton>
      </NavLink>

      <NavLink to="/search">
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <SearchSharpIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItemButton>
      </NavLink>

      <NavLink to="/notification">
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <NotificationsSharpIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Notification" />
        </ListItemButton>
      </NavLink>

      <NavLink to="/chat">
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <MailOutlineRoundedIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItemButton>
      </NavLink>

      <NavLink to="/profile">
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <AccountBoxSharpIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
      </NavLink>
    </List>
  );
};

export default SidebarList;
