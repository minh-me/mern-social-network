import { Box, Typography } from '@mui/material';

export const Title = ({ title = '' }) => {
  return (
    <Box py={2} px={3}>
      <Typography variant="h4" component="h4" fontWeight="600" fontSize={20}>
        {title}
      </Typography>
    </Box>
  );
};
