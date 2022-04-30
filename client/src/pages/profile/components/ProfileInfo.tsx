import { Box, Typography } from '@mui/material';
import { grey, pink } from '@mui/material/colors';

type Props = {
  name: string;
  email: string;
};

export const ProfileInfo = ({ name, email }: Props) => {
  return (
    <Box mt={2} px={2}>
      <Typography fontSize={22} textTransform="capitalize" color={pink[500]} fontWeight={600}>
        {name}
      </Typography>
      <Typography fontSize={14} color={grey[500]}>
        @{email.split('@')[0]}
      </Typography>
    </Box>
  );
};
