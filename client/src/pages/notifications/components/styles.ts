export const styles = {
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #38444d',
    height: '40px',
    padding: '12px 15px',
    transition: 'all 300ms ease-in-out',
    '&:hover': {
      bgcolor: '#192734',

      '.time': {
        transition: 'all 300ms ease-in-out',
        display: 'none',
      },
      '.btn-delete': {
        display: 'flex',
      },
    },
  },
  text: {
    fontWeight: 400,
    fontSize: 14,
  },
  times: {
    fontSize: 10,
    color: '#848A8F',
    fontWeight: 400,
  },
  iconDelete: {
    color: '#848A8F',
    display: 'none',
    aligItems: 'center',
    transition: 'all 300ms ease-in-out',
    svg: { width: '0.8em', height: '0.8em' },
  },
};
