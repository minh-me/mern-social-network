import { Box, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';

const Logo = () => {
  return (
    <Box
      sx={{
        borderBottom: 2,
        borderColor: pink[600],
        borderRadius: '50%',
        marginRight: 3,
      }}
    >
      <Typography
        sx={{ paddingTop: 2, textAlign: 'center', marginBottom: 1, color: pink[400] }}
        fontWeight={800}
        variant="h3"
        fontSize={28}
      >
        SN2
      </Typography>
    </Box>
  );
};

export default Logo;
