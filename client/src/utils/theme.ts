import { blueGrey } from '@mui/material/colors';

export const styleScroll = {
  '&::-webkit-scrollbar': {
    width: 6,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: blueGrey['A700'],
    borderRadius: '2px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: blueGrey[400],
  },
};
