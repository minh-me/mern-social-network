import { pink } from '@mui/material/colors';

export const styles = {
  link: {
    marginTop: '2px',
    color: pink[500],
    fontSize: 13,
    fontWeight: 400,
    textTransform: 'capitalize',
    p: 0,
    display: 'block',

    '&:hover': {
      textDecoration: 'underline',
      color: pink[400],
      cursor: 'pointer',
    },
    '&:disabled': {
      color: pink[400],
    },
  },
  text: {
    color: '#72767D',
    fontSize: 12,
    a: {
      color: pink[400],
      textDecoration: 'none',
      marginLeft: 1,
    },
    'a:hover': {
      textDecoration: 'underline',
      color: pink[500],
    },
  },

  button: {
    color: '#fff',
    background: pink[500],
    textTransform: 'capitalize',
    fontWeight: '400',
    '&:hover': {
      background: pink[400],
    },
    '&:disabled': {
      background: pink[400],
      div: {
        color: 'white',
      },
    },
  },
};
