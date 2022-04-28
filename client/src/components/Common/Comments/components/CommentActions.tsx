import { Box, Typography } from '@mui/material';
import React from 'react';

type Props = {};

const CommentActions = (props: Props) => {
  return (
    <Box sx={{ display: 'flex', mt: '4px' }}>
      <Typography
        sx={{
          fontSize: 10,
          mr: 2,
          textTransform: 'inherit',
          '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer',
          },
        }}
        component="span"
        variant="body2"
      >
        Thích
      </Typography>
      <Typography
        sx={{
          fontSize: 10,
          mr: 2,
          textTransform: 'inherit',
          '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer',
          },
        }}
        component="span"
        variant="body2"
      >
        Phản hồi
      </Typography>
      <Typography
        sx={{
          fontSize: 10,
          textTransform: 'inherit',
          '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer',
          },
        }}
        component="span"
        variant="body2"
      >
        15 giờ
      </Typography>
    </Box>
  );
};
