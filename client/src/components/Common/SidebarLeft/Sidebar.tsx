import { Box } from '@mui/material';
import SidebarList from './SidebarList';
import Logo from './Logo';
import { SidebarListIcons } from './SidebarListIcons';

export const Sidebar = () => {
  return (
    <Box sx={{ height: '100vh' }}>
      {/* Logo */}
      <Logo />
      {/* Sidebar Item */}
      <Box sx={{ display: { sm: 'none', md: 'inherit' } }}>
        <SidebarList />
      </Box>
      <Box sx={{ display: { sm: 'inherit', md: 'none' } }}>
        <SidebarListIcons />
      </Box>
    </Box>
  );
};
