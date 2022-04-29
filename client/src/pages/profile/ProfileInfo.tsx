import { Box, Typography } from '@mui/material';
import { grey, pink } from '@mui/material/colors';

type Props = {};

export const ProfileInfo = (props: Props) => {
  return (
    <Box mt={2} px={2}>
      <Typography fontSize={22} textTransform="capitalize" color={pink[500]} fontWeight={600}>
        Minh Chìu
      </Typography>
      <Typography fontSize={14} color={grey[500]}>
        @minh.mchiu
      </Typography>
    </Box>
  );
};
