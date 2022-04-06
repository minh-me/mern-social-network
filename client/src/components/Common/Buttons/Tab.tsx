import { Button } from '@mui/material';
import React, { FC } from 'react';

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
      sx={{
        backgroundColor: active ? '#192734' : '',
        color: active ? '#f91880' : '#8899a6',
        borderRadius: 20,
        transition: 'all 300ms ease-in-out',
        fontWeight: 600,
        borderColor: active ? 'inherit' : 'transparent',
        fontSize: 18,
        '&:hover': {
          backgroundColor: '#192734',
          color: '#f91880',
        },
        textTransform: 'capitalize',
        ...rest,
      }}
    >
      {text}
    </Button>
  );
};
