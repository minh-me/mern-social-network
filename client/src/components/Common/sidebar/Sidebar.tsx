import { Box } from '@mui/material';
import SidebarList from './SidebarList';
import Logo from './Logo';

type Props = {};

export const Sidebar = (props: Props) => {
  return (
    <Box sx={{ height: '100vh' }}>
      {/* Logo */}
      <Logo />
      {/* Sidebar Item */}
      <SidebarList />
    </Box>
  );
};
