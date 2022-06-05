import { Box, Typography } from '@mui/material';
import { UsersTable } from './UsersTable';

export const AdminPage = () => {
  return (
    <Box>
      <Box py={2}>
        <Typography textAlign="center" fontWeight={700} component="h3" fontSize={20} color="white">
          Users
        </Typography>
      </Box>
      <Box px={4}>
        <UsersTable />
      </Box>
    </Box>
  );
};
