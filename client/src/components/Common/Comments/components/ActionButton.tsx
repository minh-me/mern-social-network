import { FC } from 'react';
import { Theme } from '@emotion/react';
import { Typography, SxProps } from '@mui/material';

type Props = {
  children: JSX.Element[] | JSX.Element | string;
  sx?: SxProps<Theme>;
  onClick?: () => void;
};

export const ActionButton: FC<Props> = ({ children, sx, onClick }) => {
  return (
    <Typography
      sx={{
        fontSize: 10,
        mr: 2,
        textTransform: 'inherit',
        cursor: 'pointer',
        '&:hover': { textDecoration: 'underline' },
        ...sx,
      }}
      component="span"
      variant="body2"
      onClick={onClick}
    >
      {children}
    </Typography>
  );
};
