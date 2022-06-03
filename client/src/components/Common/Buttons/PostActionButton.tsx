import React, { FC } from 'react';
import { Button, SxProps, Theme } from '@mui/material';

type PostActionButtonProps = {
  startIcon?: React.ReactNode;
  sx?: SxProps<Theme>;
  numbs?: number | null;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const PostActionButton: FC<PostActionButtonProps> = ({
  sx,
  startIcon,
  numbs,
  onClick,
  disabled = false,
}) => {
  return (
    <Button
      variant="contained"
      disabled={disabled}
      sx={{
        color: '#b0b3b8',
        bgcolor: '#2d2a34',
        borderRadius: 4,
        transition: 'all 0.3s ease-in-out',
        fontSize: 14,
        py: numbs ? '2px' : '6px',
        boxShadow: 0,
        span: {
          mr: '3px',
        },
        '&:hover': {
          boxShadow: 0,
          bgcolor: 'rgba(153, 158, 163, 0.2)',
        },
        svg: {
          height: '16px',
          width: '16px',
        },
        '&:disabled': {
          color: 'white',
        },
        ...sx,
      }}
      startIcon={startIcon}
      onClick={onClick}
    >
      {numbs}
    </Button>
  );
};
