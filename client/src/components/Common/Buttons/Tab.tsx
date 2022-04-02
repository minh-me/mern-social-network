import { Button } from '@mui/material';
import { FC } from 'react';

type Props = {
  text: string;
  active?: boolean;
  [key: string]: any;
};

export const Tab: FC<Props> = ({ active, text, ...rest }) => {
  return (
    <Button
      fullWidth
      variant="text"
      size="large"
      sx={{
        backgroundColor: active ? '#192734' : '',
        color: active ? '#f91880' : '#8899a6',
        borderRadius: 20,
        transition: 'all 300ms ease-in-out',
        fontWeight: 600,
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
