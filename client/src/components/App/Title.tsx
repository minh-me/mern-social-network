import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

type TitleProps = {
  title: string;
};

export const Title: FC<TitleProps> = ({ title }) => {
  return (
    <Box py={2} px={3} sx={{ borderBottom: 2, borderBottomColor: grey[600] }}>
      <Typography variant="h4" component="h4" fontWeight="900" fontSize={24}>
        {title}
      </Typography>
    </Box>
  );
};
