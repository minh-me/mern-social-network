import { Theme } from '@emotion/react';
import { Typography, SxProps } from '@mui/material';
import { FC } from 'react';

type Props = {
  children: JSX.Element[] | JSX.Element | string;
  sx?: SxProps<Theme>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const CommentActionButton: FC<Props> = ({ children, sx, onClick }) => {
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
