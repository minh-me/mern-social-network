import React, { FC } from 'react';
import { Button } from '@mui/material';

type Props = {
  text: string;
  active?: boolean;
  [key: string]: any;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const Tab: FC<Props> = ({ active, text, onClick, ...rest }) => {
  return (
    <Button
      onClick={onClick}
      fullWidth
      variant="outlined"
      disabled={active}
      sx={{
        borderRadius: 20,
        color: '#8899a6',
        transition: 'all 300ms ease-in-out',
        borderColor: 'transparent',
        textTransform: 'capitalize',
        fontSize: 18,
        fontWeight: 600,
        '&:disabled': {
          borderColor: 'inherit',
        },
        '&:hover, &:disabled': {
          backgroundColor: '#192734',
          color: '#f91880',
        },
        ...rest,
      }}
    >
      {text}
    </Button>
  );
};
